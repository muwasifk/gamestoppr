from django.contrib.auth.models import User
from django.http import JsonResponse
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.generics import UpdateAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.utils import timezone

from datetime import datetime, timedelta

from authentication.models import Profile

from block.models import BlockEvent, DevicePing

from block.serializers import BlockedSerializer, BlockEventSerializer, UserPingSerializer, DevicePingSerializer, MoneySerializer

from device.models import Device

class BlockedUpdateView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = BlockedSerializer

    def get_object(self):
        user = self.request.user
        return user.profile

    def get(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        device_ping = DevicePing.objects.filter(user=user).last()


        # Check if the last ping was more than 5 minutes ago
        try:
            if device_ping.last_ping != None:
                if device_ping.last_ping:
                    if timezone.now() - device_ping.last_ping > timedelta(minutes=5):
                        profile.blocked = False
                        profile.save()
        except:
            pass

        serializer = BlockedSerializer(profile)
        return Response(serializer.data)

class BlockEventListView(ListAPIView):
    serializer_class = BlockEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        limit = int(self.request.query_params.get('limit', 10))
        return BlockEvent.objects.filter(user=user).order_by('-start_time')[:limit]

class UserPingView(CreateAPIView):
    serializer_class = DevicePingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        profile = Profile.objects.get(user=user)
        device_id = request.data.get('device_id')

        if not device_id:
            return Response({'error': 'device_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate device_id
        if not Device.objects.filter(device_id=device_id).exists():
            return Response({'error': 'Invalid device_id'}, status=status.HTTP_400_BAD_REQUEST)

        device_ping, created = DevicePing.objects.get_or_create(user=user, device_id=device_id)

        # Check if the user is blocked
        if not profile.blocked:
            return Response({'detail': 'User is not blocked'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the last ping was more than 5 minutes ago
        try:
            if device_ping.last_ping != None:
                if device_ping.last_ping:
                    if timezone.now() - device_ping.last_ping > timedelta(minutes=5):
                        profile.blocked = False
                        profile.save()
        except:
            pass

        # Update the DevicePing
        device_ping.last_ping = timezone.now()
        device_ping.valid_ping_count += 1
        device_ping.save()

        return Response(self.get_serializer(device_ping).data)
    
class MoneyView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = MoneySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile