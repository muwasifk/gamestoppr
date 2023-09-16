from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from rest_framework import serializers, validators
from rest_framework.exceptions import ValidationError

from decimal import Decimal

from block.models import BlockEvent, DevicePing

from authentication.models import authenticate_user, Profile

class BlockedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('blocked',)

    def update(self, instance, validated_data):
        blocked = validated_data.get('blocked')
        user = instance.user

        if blocked:
            BlockEvent.objects.create(user=user, start_time=timezone.now())
        else:
            block_event = BlockEvent.objects.filter(user=user, end_time__isnull=True).last()
            if block_event:
                block_event.end_time = timezone.now()
                rewards = calculate_rewards(user)
                block_event.rewards = rewards

                block_event.save()

                instance.money += rewards
                instance.save()

                DevicePing.objects.filter(user=user).update(valid_ping_count=0)

        instance.blocked = blocked
        instance.save()
        return instance


def calculate_rewards(user):
    device_pings = DevicePing.objects.filter(user=user)
    total_valid_ping_count = sum(dp.valid_ping_count for dp in device_pings)
    money = Decimal(total_valid_ping_count)
    return money


class BlockEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockEvent
        fields = '__all__'

class UserPingSerializer(serializers.ModelSerializer):

    class Meta:
        model = DevicePing
        fields = '__all__'

class DevicePingSerializer(serializers.ModelSerializer):

    class Meta:
        model = DevicePing
        fields = '__all__'
