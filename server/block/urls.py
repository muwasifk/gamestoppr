from django.urls import path
from knox import views as knox_views

from block.views import BlockedUpdateView, BlockEventListView, UserPingView

urlpatterns = [
    path('', BlockedUpdateView.as_view(), name='block'),
    path('block-events/', BlockEventListView.as_view(), name='block-event-list'),
    path('ping/', UserPingView.as_view(), name='user-ping'),
]