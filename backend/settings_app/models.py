from django.db import models


class SiteSettings(models.Model):
    id = models.AutoField(primary_key=True)

    # 3D Universe Settings
    camera_rotation_speed = models.FloatField(default=0.001, help_text="Auto-rotation speed")
    particle_count = models.IntegerField(default=1000, help_text="Number of background particles")
    music_enabled = models.BooleanField(default=True)

    # UI Settings
    landing_message = models.TextField(
        default="Made for you, my universe",
        help_text="Message on landing page"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return f"Site Settings {self.id}"

    @classmethod
    def get_settings(cls):
        settings, created = cls.objects.get_or_create(id=1)
        return settings