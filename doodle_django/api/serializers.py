from rest_framework import serializers

from django.utils.timezone import *
from django.core.validators import *
from django.contrib.auth import get_user_model,authenticate

from . models import *


class SchedulePollLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulePollLink
        fields = ('token',)

        
class SchedulePollSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchedulePoll
        fields = '__all__'

class TimeSlotSerializer(serializers.ModelSerializer):

    schedule_poll = SchedulePollSerializer(required=False)
    
    def __init__(self, *args, **kwargs):
        super(TimeSlotSerializer, self).__init__(*args, **kwargs)
        self.fields["schedule_poll"].read_only = True if self.context.get("ignore_poll") else False
    
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
    link = SchedulePollLinkSerializer(required=False)

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

class VoteSerializerOut(serializers.ModelSerializer):
    time_slot = TimeSlotSerializer(read_only=True, context={"ignore_poll":True})
    preference = serializers.CharField(read_only=True)
    class Meta:
        model = Vote
        exclude = ('user',)
        
class VoteSerializer(serializers.ModelSerializer):
    
    preference = serializers.ChoiceField(   
        choices=(1,2,3)
    )

    time_slot = TimeSlotSerializer(context={"ignore_poll":True})

    user = serializers.ReadOnlyField()

    def create(self, validated_data):
        ts = validated_data.get("time_slot")
        ts_serializer = TimeSlotSerializer(data=ts, context={"ignore_poll":True})
        if ts_serializer.is_valid():
            ts["schedule_poll_id"] = self.context.get("poll").pk
            ts = TimeSlot.objects.update_or_create(**ts)
        vote = Vote.objects.create(
            preference=PreferenceSerializer(Preference.objects.get(pk=validated_data.get("preference"))).data,
            time_slot=ts[0],
            user=self.context.get("user"),
            user_nickname=validated_data.get("user_nickname")
        )
        return vote

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