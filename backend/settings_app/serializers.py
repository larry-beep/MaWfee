from rest_framework import serializers
from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'id',
            'camera_rotation_speed',
            'particle_count',
            'music_enabled',
            'landing_message',
        ]
        read_only_fields = ['id']