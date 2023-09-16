from django.contrib import admin


from .models import BlockEvent, DevicePing

# Register your models here.
admin.site.register(BlockEvent)

class DevicePingAdmin(admin.ModelAdmin):
    list_display = ['user', 'device_id', 'last_ping', 'valid_ping_count']

admin.site.register(DevicePing, DevicePingAdmin)
