from rest_framework import serializers
from django.utils.timezone import *

from django.core.validators import *

from . models import *
from django.contrib.auth import get_user_model,authenticate

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['start_date', 'end_date', 'preference']

class ParticipantPreferenceSerializer(serializers.ModelSerializer):
    selected_timeslots = TimeSlotSerializer(many=True)

    class Meta:
        model = ParticipantPreference
        fields = ['selected_timeslots']

    def create(self, validated_data):
        selected_timeslots_data = validated_data.pop('selected_timeslots')
        instance = ParticipantPreference.objects.create(**validated_data)

        for time_slot_data in selected_timeslots_data:
            instance.selected_timeslots.create(**time_slot_data)

        return instance
# UserModel = get_user_model()

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']
# class UserRegisterSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserModel
# 		fields = '__all__'
# 	def create(self, clean_data):
# 		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
# 		user_obj.username = clean_data['username']
# 		user_obj.save()
# 		return user_obj

# class UserLoginSerializer(serializers.Serializer):
# 	email = serializers.EmailField()
# 	password = serializers.CharField()
# 	##
# 	def check_user(self, clean_data):
# 		user = authenticate(username=clean_data['email'], password=clean_data['password'])
# 		if not user:
# 			raise serializers.ValidationError('user not found')
# 		return user

# class UserSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserModel
# 		fields = ('email', 'username')
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