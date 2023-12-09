from rest_framework import serializers
from django.utils.timezone import *

from django.core.validators import *

from . models import *
from django.contrib.auth import get_user_model,authenticate

# class ParticipantPreferenceSerializer(serializers.ModelSerializer):
#     selected_timeslots = TimeSlotSerializer(many=True)

#     class Meta:
#         model = ParticipantPreference
#         fields = ['selected_timeslots']

#     def create(self, validated_data):
#         selected_timeslots_data = validated_data.pop('selected_timeslots')
#         instance = ParticipantPreference.objects.create(**validated_data)

#         for time_slot_data in selected_timeslots_data:
#             instance.selected_timeslots.create(**time_slot_data)

#         return instance

class SchedulePoolLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulePoolLink
        fields = ('token',)

        
class SchedulePoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulePool
        fields = '__all__'

class TimeSlotSerializer(serializers.ModelSerializer):

    schedule_pool = SchedulePoolSerializer(required=False, read_only=True)

    def validate(self, data):
        if 'end_date' in data and 'start_date' in data:
            if data['end_date'] < data['start_date']:
                raise serializers.ValidationError("End must occur after Start Date", code="EndDateBeforeStartDate")

        return data

    class Meta:
        model = TimeSlot
        fields = '__all__'


class MeetingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meeting
        fields = '__all__'

    timeslots = TimeSlotSerializer(many=True, required=False)
    link = SchedulePoolLinkSerializer(required=False)

    def to_representation(self, obj):
        ret = super(MeetingSerializer, self).to_representation(obj)

        if not self.context.get('passcode', False):
            ret.pop("passcode")

        return ret

    def validate_deadline(self, value):
        """
        Validate that the deadline is not in the past.
        """
        if value and value < now():
            raise serializers.ValidationError("Meeting deadline cannot be in the past.")
        return value
    
class PreferenceSerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        ret = super(PreferenceSerializer, self).to_representation(obj)
        ret.pop('id')
        return ret

    class Meta:
        model = Preference
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    preference = PreferenceSerializer()
    class Meta:
        model = Vote
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