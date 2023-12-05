# Generated by Django 4.2.7 on 2023-11-28 18:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_alter_meeting_creation_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(db_column='id', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='name', max_length=20)),
                ('message', models.CharField(db_column='message', max_length=1500)),
                ('creation_date', models.DateTimeField(auto_now_add=True, db_column='creation_date')),
                ('email', models.EmailField(blank=True, db_column='email', max_length=254, null=True)),
                ('user_id', models.ForeignKey(blank=True, db_column='user_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FeedbackAttachment',
            fields=[
                ('id', models.AutoField(db_column='id', primary_key=True, serialize=False)),
                ('file', models.FileField(db_column='file', upload_to='feedback/')),
                ('feedback_id', models.ForeignKey(blank=True, db_column='feedback_id', null=True, on_delete=django.db.models.deletion.CASCADE, to='api.feedback')),
            ],
        ),
    ]