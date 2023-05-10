import json, time

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
    row = add_posts_info(request, row)
    p = Paginator(row, 3)
    row = p.get_page(page_number)
    time.sleep(1)
    return render(request, "network/index.html", {
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

def account(request, username=None, page_number=1):
    row = Posts.objects.filter(username_posts=User.objects.get(username=username)).order_by('-date')
    
    user = User.objects.get(username=username)
    p = Paginator(add_posts_info(request, row), 3)
    row = p.get_page(page_number)
    time.sleep(1)
    return render(request, "network/account.html", {
        "username": user,
        "following": UserInfo.objects.filter(username_userinfo=User.objects.get(username=username)),
        "followers": UserInfo.objects.filter(i_follow_users__exact=User.objects.get(username=username)),
        "posts": row
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

@login_required(login_url="network:login")
def settings(request, action=None):
    if (action == 'username'):
        body = json.loads(request.body)
        user_info = User.objects.get(id=request.user.id)
        user_info.username = body.get('username')
        user_info.save()
        return HttpResponse(status=201)
    elif (action == 'email'):
        body = json.loads(request.body)
        user_info = User.objects.get(id=request.user.id)
        user_info.email = body.get('email')
        user_info.save()
        return HttpResponse(status=201)
    return render(request, "network/settings.html")

def get_slice_of_posts(request, end, start=0):
    return Posts.objects.all().order_by('-date')[start:end]

def add_posts_info(request, row):
    for post in row:
        if (request.user in list(post.likes.all())):
            post.bool_field = True
        else:
            post.bool_field = False
    return row

@login_required(login_url="network:login")
def like_post(request, post_id):
    obj = Posts.objects.get(id=post_id)
    if (request.user in list(obj.likes.all())):
        obj.likes.remove(request.user)
    else:
        obj.likes.add(request.user)
    return HttpResponse(status=201)