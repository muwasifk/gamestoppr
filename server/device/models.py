from django.db import models

# Create your models here.

class Device(models.Model):
    device_id = models.CharField(max_length=256, unique=True)
    registered_at = models.DateTimeField(auto_now_add=True)