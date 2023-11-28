from rest_framework import serializers
from django.utils.timezone import *

from django.core.validators import *

from . models import *

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

    def validate_deadline(self, value):
        """
        Validate that the deadline is not in the past.
        """
        if value and value < now():
            raise serializers.ValidationError("Meeting deadline cannot be in the past.")
        return value
    

class TimeSlotSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if 'end_date' in data and 'start_date' in data:
            if data['end_date'] < data['start_date']:
                raise serializers.ValidationError("End must occur after Start Date", code="EndDateBeforeStartDate")

        return data

    class Meta:
        model = TimeSlot
        fields = '__all__'


class MeetingTimeSlotSerializer(MeetingSerializer):
    timeslots = TimeSlotSerializer(many=True)

        
class SchedulePoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulePool
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    def validate(self, data):
        user = self.context.get("user")
        email = data.get("email", None)
        if (not user or not user.is_authenticated) and not email:
            raise serializers.ValidationError("User must be logged or a valid email must be provided", code="MissingEmail")
        return data

    class Meta:
        model = Feedback
        fields = '__all__'

class FeedbackAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackAttachment
        fields = '__all__'