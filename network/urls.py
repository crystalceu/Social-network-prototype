
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:page_number>", views.index, name="index_page"),
    path("following/<str:following>/<int:page_number>", views.index, name="index_author_page"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("account", views.account, name="account"),
    path("<str:username>", views.account, name="another_account"),
    path("edit/post/<int:post_id>", views.edit_post, name="edit_post"),
    path("create_post/<str:username>", views.create_post, name="create_post"),
    path("delete_post/<int:post_id>", views.delete_post, name="delete_post"),
    path("follow_user/<str:username>", views.follow_user, name="follow_user")
]
