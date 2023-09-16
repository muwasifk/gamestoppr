from django.db import models
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    money = models.DecimalField(default=0, max_digits=19, decimal_places=2)
    blocked = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


def authenticate_user(username, password):
    user = authenticate(username=username, password=password)
    if not user:
        raise ValidationError("Incorrect Credentials.")
    return user