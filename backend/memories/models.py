import uuid
from django.db import models
from django.core.validators import FileExtensionValidator


class Memory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    caption = models.TextField(max_length=1000)
    media_url = models.URLField(max_length=500, blank=True, null=True)

    # 3D positioning
    position_x = models.FloatField(default=0.0, help_text="X position in 3D space")
    position_y = models.FloatField(default=0.0, help_text="Y position in 3D space")
    position_z = models.FloatField(default=0.0, help_text="Z position in 3D space")
    orbit_radius = models.FloatField(default=5.0, help_text="Distance from center")

    # Memory properties
    is_secret = models.BooleanField(default=False, help_text="Hidden Heart Star memory")
    is_featured = models.BooleanField(default=False)
    category = models.CharField(max_length=50, choices=[
        ('romantic', '💕 Romantic'),
        ('adventure', '🌟 Adventure'),
        ('milestone', '🎯 Milestone'),
        ('everyday', '☀️ Everyday'),
    ])
    date = models.DateField()
    order = models.PositiveIntegerField(default=0, help_text="Display order")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'date']
        indexes = [
            models.Index(fields=['is_secret', 'is_featured']),
            models.Index(fields=['category']),
        ]

    def __str__(self):
        return self.title