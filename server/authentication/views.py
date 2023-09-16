from django.contrib.auth.models import User
from django.http import JsonResponse
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.models import Profile

from authentication.serializers import LoginSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        return JsonResponse({
            "token": AuthToken.objects.create(user)[1]
        })