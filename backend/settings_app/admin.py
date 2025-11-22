from django.contrib import admin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['id', 'camera_rotation_speed', 'particle_count', 'music_enabled', 'landing_message']
    readonly_fields = ['id', 'created_at', 'updated_at']

    fieldsets = (
        ('3D Universe Settings', {
            'fields': ('camera_rotation_speed', 'particle_count', 'music_enabled')
        }),
        ('UI Settings', {
            'fields': ('landing_message',)
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of site settings
        return False

    def has_add_permission(self, request):
        # Only allow one instance
        return not SiteSettings.objects.exists()