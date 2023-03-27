# Generated by Django 4.1.3 on 2023-02-26 12:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('i_follow_users', models.ManyToManyField(blank=True, related_name='i_follow_users', to=settings.AUTH_USER_MODEL)),
                ('user_follows_me', models.ManyToManyField(blank=True, related_name='user_follows_me', to=settings.AUTH_USER_MODEL)),
                ('username_userinfo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='username_userinfo', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=64)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('likes', models.ManyToManyField(blank=True, related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('username_posts', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='username_posts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]