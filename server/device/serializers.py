from rest_framework import serializers
from .models import Device

class DeviceRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['device_id']
        extra_kwargs = {'secret_key': {'write_only': True}}

    def create(self, validated_data):
        return Device.objects.create(**validated_data)
