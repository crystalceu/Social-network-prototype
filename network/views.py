import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, UserInfo, Posts


def index(request, following='None', page_number=1):
    if following == 'None':
        row = Posts.objects.all().order_by('-date')
    else:
        row = Posts.objects.filter(username_posts__in=UserInfo.objects.get(username_userinfo=request.user).i_follow_users.all()).order_by('-date')
    p = Paginator(row, 2)
    row = p.get_page(page_number)
    return render(request, "network/index.html", {
        "all_posts": p,
        "posts": row
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def account(request, username=None):
    if username == None:
        username = request.user.username
    return render(request, "network/account.html", {
        "username": User.objects.get(username=username),
        "following": UserInfo.objects.filter(username_userinfo=User.objects.get(username=username)),
        "followers": UserInfo.objects.filter(i_follow_users__exact=User.objects.get(username=username)),
        "posts": reversed(Posts.objects.filter(username_posts=User.objects.get(username=username)))
    })

@login_required(login_url="network:login")
def create_post(request, username):
    body = json.loads(request.body)
    newObject = {'username_posts': User.objects.get(username=body.get('username')), 'content': body.get('content')}
    post = Posts.objects.create(**newObject)
    post.save()
    return HttpResponse(status=201)

@login_required(login_url="network:login")
def edit_post(request, post_id):
    body = json.loads(request.body)
    print(body.get('post_new_version'))
    post = Posts.objects.get(id=post_id)
    post.content = body.get('post_new_version')
    post.save()
    return HttpResponse(status=201)

@login_required(login_url="network:login")
def follow_user(request, username):
    try:
        row = UserInfo.objects.get(username_userinfo=User.objects.get(id=request.user.id))
    except:
        newObject = {'username_userinfo': User.objects.get(id=request.user.id)}
        row = UserInfo.objects.create(**newObject)
        row.save()
    row.i_follow_users.add(User.objects.get(username=username))
    return HttpResponse(status=201)

@login_required(login_url="network:login")
def index_following(request):
    posts = Posts.objects.filter(username_posts=request.user)
    return HttpResponse(status=201)

@login_required(login_url="network:login")
def delete_post(request, post_id):
    obj = Posts.objects.get(id=post_id)
    obj.delete()
    return HttpResponse(status=201)