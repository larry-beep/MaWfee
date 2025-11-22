from rest_framework import serializers
from .models import Memory


class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = [
            'id', 'title', 'caption', 'media_url',
            'position_x', 'position_y', 'position_z', 'orbit_radius',
            'is_secret', 'is_featured', 'category', 'date', 'order'
        ]
        read_only_fields = ['id']


class MemoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = [
            'title', 'caption', 'media_url',
            'position_x', 'position_y', 'position_z', 'orbit_radius',
            'is_secret', 'is_featured', 'category', 'date', 'order'
        ]