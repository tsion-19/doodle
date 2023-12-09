# Generated by Django 4.2.7 on 2023-12-07 15:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('description', models.CharField(choices=[('YES', 'YES'), ('MAYBE', 'MAYBE'), ('NO', 'NO')], db_column='description', max_length=500)),
            ],
        ),
        migrations.AddField(
            model_name='meeting',
            name='user_id',
            field=models.ForeignKey(blank=True, db_column='user_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='meeting',
            name='user_nickname',
            field=models.CharField(blank=True, db_column='user_nickname', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='vote',
            name='user_id',
            field=models.ForeignKey(blank=True, db_column='user_id', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='vote',
            name='user_nickname',
            field=models.CharField(blank=True, db_column='user_nickname', max_length=20, null=True),
        ),
    ]