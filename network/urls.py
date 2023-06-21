from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:page_number>", views.index, name="index_page"),
    path("following/<str:following>/<int:page_number>", views.index, name="index_author_page"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("settings", views.settings, name="settings"),
    path("settings/<str:action>", views.settings, name="settings_action"),
    path("edit/post/<int:post_id>", views.edit_post, name="edit_post"),
    path("create_post/<str:username>", views.create_post, name="create_post"),
    path("delete_post/<int:post_id>", views.delete_post, name="delete_post"),
    path("like_post/<int:post_id>", views.like_post, name="like_post"),
    path("follow_user/<str:username>", views.follow_user, name="follow_user"),
    path("unfollow_user/<str:username>", views.unfollow_user, name="unfollow_user"),
    path("account/<str:username>/<int:page_number>", views.account, name="account_page"),
    path("account/<str:username>", views.account, name="account")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
