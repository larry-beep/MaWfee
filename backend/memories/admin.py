from django.contrib import admin
from .models import Memory


@admin.register(Memory)
class MemoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'date', 'is_featured', 'is_secret', 'created_at']
    list_filter = ['category', 'is_featured', 'is_secret', 'date', 'created_at']
    search_fields = ['title', 'caption']
    readonly_fields = ['id', 'created_at', 'updated_at']

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'caption', 'category', 'date', 'order')
        }),
        ('3D Positioning', {
            'fields': ('position_x', 'position_y', 'position_z', 'orbit_radius'),
            'classes': ('collapse',)
        }),
        ('Media', {
            'fields': ('media_url',)
        }),
        ('Flags', {
            'fields': ('is_featured', 'is_secret')
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    ordering = ['order', 'date']