from django.urls import path
from .views import AppBlockListView

urlpatterns = [
    path('block/apps/', AppBlockListView.as_view(), name='block-apps'),
]
