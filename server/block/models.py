from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BlockEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField(null = True, blank = True)
    end_time = models.DateTimeField(null = True, blank = True)
    rewards = models.DecimalField(default=0, max_digits=19, decimal_places=2)

class UserPing(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    device_id = models.CharField(max_length=255)
    last_ping = models.DateTimeField(null=True, blank=True)
    valid_ping_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'device_id')

    def __str__(self):
        return self.user.username

class DevicePing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    device_id = models.CharField(max_length=255)
    last_ping = models.DateTimeField(null=True, blank=True)
    valid_ping_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'device_id')

    def __str__(self):
        return f'{self.user.username} - {self.device_id}'