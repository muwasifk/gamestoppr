from django.contrib import admin
from .models import Device

# Register your models here.

class DeviceAdmin(admin.ModelAdmin):
    list_display = ['device_id', 'registered_at']

admin.site.register(Device, DeviceAdmin)