import uuid

from django.db import models
from django.utils.timezone import *
from django.contrib.auth import get_user_model


class TimeSlot(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id",
    )
    schedule_pool = models.ForeignKey(
        "SchedulePool",
        on_delete=models.CASCADE,
        blank=True,
    )
    start_date = models.DateTimeField(
        db_column="start_date",
    )
    end_date = models.DateTimeField(
        db_column="end_date",
    )

    class Meta:
        unique_together = ('schedule_pool', 'start_date', 'end_date')
    

class Preference(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id",
    )
    description = models.CharField(
        db_column="description",
        max_length=500,
        choices=(("YES", "YES"), ("MAYBE", "MAYBE"), ("NO","NO")),
    )    

class Meeting(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id",
    )
    title = models.CharField(
        db_column="title",
        max_length=100,
    )
    description = models.CharField(
        db_column="description",
        max_length=500,
        blank=True,
        null=True,
    )
    location = models.CharField(
        db_column="location",
        max_length=100,
        blank=True,
        null=True,
    )
    video_conferencing = models.BooleanField(
        db_column="video_conferencing",
    )
    duration = models.DurationField(
        db_column="duration",
    )
    final_date = models.ForeignKey(
        TimeSlot, 
        on_delete=models.SET_NULL,
        db_column="final_date",
        blank=True,
        null=True,
    )
    deadline = models.DateTimeField(
        db_column="deadline",
    )
    creation_date = models.DateTimeField(
        db_column="creation_date",
       auto_now_add=True
    )
    passcode = models.CharField(
        db_column="passcode",
        max_length=5,
    )
    user = models.ForeignKey(
        get_user_model(),
        db_column="user_id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    user_nickname = models.CharField(
        db_column="user_nickname",
        max_length=20,
        blank=True,
        null=True
    )

class SchedulePool(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id"
    )
    voting_start_date = models.DateTimeField()
    voting_deadline = models.DateTimeField()
    meeting = models.ForeignKey(
        to=Meeting,
        on_delete=models.CASCADE,
    )

class SchedulePoolLink(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id"
    )
    schedule_pool = models.ForeignKey(
        SchedulePool,
        on_delete=models.CASCADE,
        blank=True,
    )
    token = models.UUIDField(
        db_column="token",
        default=uuid.uuid4
    )

class Vote(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id"
    )
    preference = models.CharField(
        db_column="preference",
        max_length=100
    )
    time_slot = models.ForeignKey(
        db_column="time_slot",
        to=TimeSlot,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        get_user_model(),
        db_column="user_id",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    user_nickname = models.CharField(
        db_column="user_nickname",
        max_length=20,
        blank=True,
        null=True
    )

class Feedback(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id"
    )
    name = models.CharField(
        db_column="name",
        max_length=20,
    )
    message = models.CharField(
        db_column="message",
        max_length=1500,
    )
    creation_date = models.DateTimeField(
        db_column="creation_date",
        auto_now_add=True
    )
    email = models.EmailField(
        db_column="email",
        blank=True,
        null=True
    )
    user = models.ForeignKey(
        get_user_model(),
        db_column="user_id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

class FeedbackAttachment(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        db_column="id"
    )
    feedback = models.ForeignKey(
        Feedback,
        db_column="feedback_id",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    file = models.FileField(
        upload_to="feedback/",
        db_column="file"
    )
    
    
# class CustomTimeSlot(models.Model):
#     '''
#     REMOVED SOON, USE VOTE INSTEAD
#     '''
#     start_date = models.DateTimeField()
#     end_date = models.DateTimeField()
#     preference = models.CharField(max_length=10, default='yes')
#     participant_preference = models.ForeignKey('ParticipantPreference', related_name='time_slots', on_delete=models.CASCADE)

# class ParticipantPreference(models.Model):
#     '''
#     REMOVED SOON, USE VOTE INSTEAD
#     '''
#     YES = 'yes'
#     MAYBE = 'maybe'
#     NO = 'no'

#     PREFERENCE_CHOICES = [
#         (YES, 'Yes'),
#         (MAYBE, 'Maybe'),
#         (NO, 'No'),
#     ]

    # selected_timeslots = models.ManyToManyField(TimeSlot)
    # preference = models.CharField(
    #     max_length=10, choices=PREFERENCE_CHOICES, default=YES

    # )
