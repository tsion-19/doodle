from rest_framework import status
from rest_framework.test import APITestCase

from django.urls import reverse
from django.utils.timezone import now, timedelta
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

from .models import *


class MeetingTests(APITestCase):
   
    def test_create_meeting_successfully(self):
        """
        Creating a Meeting Successfully
        """
        create_meeting_url = reverse('api:api_meetings_create')
        data = {
            "title": "TestMeeting",
            "description": "Test Description",
            "location": "Test Location",
            "video_conferencing": False,
            "duration": timedelta(hours=1),
            "deadline": now() + timedelta(days=5),
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=1),
                    "end_date": now() + timedelta(days=2)
                },
                {
                    "start_date": now() + timedelta(days=2),
                    "end_date": now() + timedelta(days=3)
                }
            ]
        }
        response = self.client.post(create_meeting_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Debug information
        #print(f"Response data: {response.data}")
        
        self.created_meeting_id = response.data.get('id')  # Set the created meeting ID

        # Debug information
        #print(f"created_meeting_id: {self.created_meeting_id}")

    def test_create_meeting_unsuccessfully_incomplete_information(self):
        """
        Creating a Meeting Unsuccessfully with Incomplete Information
        """
        url = reverse('api:api_meetings_create')

        data = {   
            #missing title
            "description": "Test Description",
            "location": "Test Location",
            "video_conferencing": "False",
            "duration": timedelta(hours=1),     
            "deadline": now() + timedelta(days=5),
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=1),
                    "end_date": now() + timedelta(days=2)
                },
                {
                    "start_date": now() + timedelta(days=2),
                    "end_date": now() + timedelta(days=3)
                }
            ]
        }


        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(Meeting.objects.count(), 0)

    def test_create_meeting_unsuccessfully_past_deadline(self):
        """
        Creating a Meeting Unsuccessfully with a Past Deadline
        """
        url = reverse('api:api_meetings_create')

        data = {   
            "title": "TestMeeting",
            "description": "Test Description",
            "location": "Test Location",
            "video_conferencing": "False",
            "duration": timedelta(hours=1),     
            "deadline": now() - timedelta(days=1),
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=1),
                    "end_date": now() + timedelta(days=2)
                },
                {
                    "start_date": now() + timedelta(days=2),
                    "end_date": now() + timedelta(days=3)
                }
            ]
        }


        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(Meeting.objects.count(), 0)



    def test_get_list_meetings(self):
        """
        Get all meetings
        """
        #create 4 meetings
        url = reverse('api:api_meetings_create')
        
        data = {   
            "title": "TestMeeting",
            "description": "Test Description",
            "location": "Test Location",
            "video_conferencing": "False",
            "duration": timedelta(hours=1),     
            "deadline": now() + timedelta(days=5),
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=1),
                    "end_date": now() + timedelta(days=2)
                },
                {
                    "start_date": now() + timedelta(days=2),
                    "end_date": now() + timedelta(days=3)
                }
            ]
        }


        for _ in range(4):
            self.client.post(url, data, format='json')
        

        url = reverse('api:api_meetings')

        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(Meeting.objects.count(), 4)


    def test_search_single_meeting(self):
        """
        Get a single Meeting
        """
        url = reverse('api:api_meetings_create')
        
        data1 = {   
            "title": "TestMeeting",
            "description": "Test Description",
            "location": "Test Location",
            "video_conferencing": "False",
            "duration": timedelta(hours=1),     
            "deadline": now() + timedelta(days=5),
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=1),
                    "end_date": now() + timedelta(days=2)
                },
                {
                    "start_date": now() + timedelta(days=2),
                    "end_date": now() + timedelta(days=3)
                }
            ]
        }

        self.client.post(url, data1, format='json')

        data2 = {   
            "title": "OtherMeeting",
            "description": "Test Description",
            "location": "Test Location",
            "video_conferencing": "False",
            "duration": timedelta(hours=1),     
            "deadline": now() + timedelta(days=5),
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=1),
                    "end_date": now() + timedelta(days=2)
                },
                {
                    "start_date": now() + timedelta(days=2),
                    "end_date": now() + timedelta(days=3)
                }
            ]
        }


        self.client.post(url, data2, format='json')

        url = reverse('api:api_meetings')
        
        response = self.client.get(url, data={"title": "test"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 1)

        self.assertEqual(response.data[0]["title"], data1["title"])



    def test_update_meeting_successfully(self):
        # Call the create test to ensure a meeting is created and created_meeting_id is set
        self.test_create_meeting_successfully()

        # Ensure that created_meeting_id is set
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")

        # Define the update data
        updated_data = {
            "title": "UpdatedMeeting",
            "description": "Updated Description",
            "location": "Updated Location",
            "video_conferencing": True,
            "duration": timedelta(hours=2),
            "deadline": now() + timedelta(days=7),
            "passcode": "12345",# Add the 'passcode' field
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=3),
                    "end_date": now() + timedelta(days=4),
                },
                {
                    "start_date": now() + timedelta(days=4),
                    "end_date": now() + timedelta(days=5),
                },
            ],
        }

        # Make the update request
        url = reverse('api:api_meetings_edit', args=[self.created_meeting_id])
        response = self.client.put(url, updated_data, format='json')

        # Print response data and status code for debugging
        print(f"Response data: {response.data}")
        print(f"Response status code: {response.status_code}")
        if response.status_code != status.HTTP_200_OK:
           print(f"Response errors: {response.data.get('errors')}")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_meeting_unsuccessfully_not_found(self):
        self.test_create_meeting_successfully()
    # Ensure that created_meeting_id is set (you may also check if it's None or not set)
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        url = reverse('api:api_meetings_edit',args=[self.created_meeting_id])  # Assuming the meeting with ID 999 does not exist
        updated_data = {
            "title": "UpdatedMeeting",
            "description": "Updated Description",
            "location": "Updated Location",
            "video_conferencing": "True",
            "duration": timedelta(hours=2),
            "deadline": now() + timedelta(days=7),
            "passcode": "UpdatedPasscode",  # Add the 'passcode' field
            "timeslots": [
                {
                    "start_date": now() + timedelta(days=3),
                    "end_date": now() + timedelta(days=4),
                },
                {
                    "start_date": now() + timedelta(days=4),
                    "end_date": now() + timedelta(days=5),
                },
            ],
        }

        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_delete_meeting_successfully(self):
        self.test_create_meeting_successfully()
       # Ensure that created_meeting_id is set (you may also check if it's None or not set)
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        url = reverse('api:api_meetings_delete',args=[self.created_meeting_id])
        response = self.client.delete(url)


        # Example: Expecting 204 NO CONTENT
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


    def test_delete_meeting_unsuccessfully_not_found(self):
        # Ensure that created_meeting_id is set (you may also check if it's None or not set)
        self.test_create_meeting_successfully()
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        url = reverse('api:api_meetings_delete',args=[13])  # Assuming the meeting with ID 999 does not exist
        response = self.client.delete(url)


        # Example: Expecting 404 NOT FOUND
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Ensure that no meeting was deleted
        self.assertEqual(Meeting.objects.count(), 1)  # Assuming you have one test meeting created in the setUp method


    def test_update_meeting_successfully(self):
        self.test_create_meeting_successfully()
    # Ensure that created_meeting_id is set (you may also check if it's None or not set)
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        updated_data = {
            "final_date": 1,
        }
        url = reverse('api:api_meeting_book', args=[self.created_meeting_id])
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_update_meeting_unsuccessfully(self):
        self.test_create_meeting_successfully()
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        
        invalid_data = {
            "final_date": "ricca",  
        }
        
        url = reverse('api:api_meeting_book', args=[self.created_meeting_id])
        response = self.client.put(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_meeting_timeslots_successfully(self):
        self.test_create_meeting_successfully()
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        updated_data = {
            "timeslots": [{
                "start_date": "2023-12-21T09:00:00+01:00",
                "end_date": "2023-12-21T10:00:00+01:00"}],
        }
        url = reverse('api:api_meeting_timeslots', args=[self.created_meeting_id])
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_meeting_timeslots_unsuccessfully(self):
        self.test_create_meeting_successfully()
        self.assertIsNotNone(getattr(self, 'created_meeting_id', None), "created_meeting_id not set")
        
        invalid_data = {
            "timeslots": [{
                "start_dat": "2023-12-21T09:00:00+01:00",
                "end_date": "2023-12-21T10:00:00+01:00"}], 
        }
        
        url = reverse('api:api_meeting_timeslots', args=[self.created_meeting_id])
        response = self.client.put(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class FeedbackTests(APITestCase):

    '''
    Feature: Feedback Submission
    '''

    def test_feedback_creation_api_accessible(self):
        '''
        Scenario: Submitting feedback via API
        Given a user submits feedback through the website interface
        When the API receives a POST request to submit feedback
        Then the API endpoint for submitting feedback should be accessible and functional
        '''
        url = reverse('api:api_feedback_create')
        response = self.client.post(url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        
    def test_feedback_creation_api_logged_success(self):
        '''
        Scenario: Required fields in the feedback API request
        Given a user submits feedback via the API
        When the required fields (name, message, user or email) are included in the request
        Then the API should accept the request and process the feedback
        '''
        user = User.objects.create_user(username="user", password="password")
        logged = self.client.login(username="user", password="password")
        
        url = reverse('api:api_feedback_create')
        data = {
            "name": "test",
            "message": "test message",
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Feedback.objects.count(), 1)
        self.client.logout()


    def test_feedback_creation_api_anonymous_success(self):
        '''
        Scenario: Anonymous feedback submission via API
        Given a user chooses to submit anonymous feedback via the API
        When the API receives a request for anonymous feedback submission
        Then the API should handle the submission accordingly
        And allow the feedback to be submitted without mandatory identification information
        '''
        url = reverse('api:api_feedback_create')
        data = {
            "name": "test",
            "message": "test message",
            "email": "test@test.test"
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Feedback.objects.count(), 1)


    def test_feedback_creation_api_unsuccess(self):
        '''
        Scenario: Validation checks for essential information via API
        Given a user attempts to submit feedback via the API
        When the request lacks essential information
        Then the API should respond with an error message/status code
        And indicate the missing or incomplete information
        '''
        url = reverse('api:api_feedback_create')
        data = {
            "name": "test",
            "email": "test@test.test"
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Feedback.objects.count(), 0)


    def test_feedback_creation_api_files_success(self):
        '''
        Scenario: Attaching files or screenshots via API
        Given a user submits feedback with attached files via the API
        When the API processes the request
        Then the API should handle file attachments appropriately
        And associate the files with the submitted feedback
        '''
        url = reverse('api:api_feedback_create')
        tmp_file = SimpleUploadedFile("file.jpg", b"file_content", content_type="image/jpg")
        data = {
            "name": "test",
            "message": "test message",
            "email": "test@test.test",
            "attachments": tmp_file
        }

        response = self.client.post(url, data=data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Feedback.objects.count(), 1)
