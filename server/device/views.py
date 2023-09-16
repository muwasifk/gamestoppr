from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from device.serializers import DeviceRegistrationSerializer

class DeviceRegistrationView(generics.CreateAPIView):
    serializer_class = DeviceRegistrationSerializer

    def create(self, request, *args, **kwargs):
        device_id = request.data.get('device_id')
        secret_key = request.data.get('secret_key')

        if not device_id or not secret_key:
            return Response({'error': 'device_id and secret_key are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate secret_key
        if secret_key != 'test':
            return Response({'error': 'Invalid secret_key'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Device successfully registered"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

