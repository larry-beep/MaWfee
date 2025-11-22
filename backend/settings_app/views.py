from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def settings_view(request):
    """Get current site settings"""
    settings = SiteSettings.get_settings()
    serializer = SiteSettingsSerializer(settings)
    return Response(serializer.data)