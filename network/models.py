from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    pass

class UserInfo(models.Model):
    username_userinfo = models.ForeignKey(User, on_delete=models.CASCADE, related_name="username_userinfo")
    i_follow_users = models.ManyToManyField(User, blank=True, related_name="i_follow_users")

    def create(cls, **dingo):
        userinfo = cls(username_userinfo=dinfo[0])
        return userinfo

class Posts(models.Model):
    username_posts = models.ForeignKey(User, on_delete=models.CASCADE, related_name="username_posts")
    content = models.CharField(max_length = 64)
    likes = models.ManyToManyField(User, blank=True, related_name="likes")
    date = models.DateTimeField(default=timezone.now)
    last_edit_date = models.DateTimeField(default=timezone.now)

    def create(cls, **dinfo):
        post = cls(username_posts=dinfo[0], content=dinfo[1])
        return post