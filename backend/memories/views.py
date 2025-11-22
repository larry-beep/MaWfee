from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Memory
from .serializers import MemorySerializer, MemoryCreateSerializer


class MemoryViewSet(viewsets.ModelViewSet):
    queryset = Memory.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return MemoryCreateSerializer
        return MemorySerializer

    def get_queryset(self):
        # Public endpoints exclude secret memories
        if not self.request.user.is_authenticated:
            return Memory.objects.filter(is_secret=False)
        return Memory.objects.all()

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def upload(self, request):
        """Handle file upload and return URL"""
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate file type and size (10MB max)
        allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']
        if file.content_type not in allowed_types:
            return Response({'error': 'Invalid file type'}, status=status.HTTP_400_BAD_REQUEST)

        if file.size > 10 * 1024 * 1024:  # 10MB
            return Response({'error': 'File too large'}, status=status.HTTP_400_BAD_REQUEST)

        # Save file and return URL
        import os
        file_path = f'memories/{file.name}'

        # Create media directory if it doesn't exist
        media_path = os.path.join('media', 'memories')
        os.makedirs(media_path, exist_ok=True)

        with open(f'media/{file_path}', 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        file_url = f'/media/{file_path}'
        return Response({'media_url': file_url}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def secret_reveal(self, request):
        """Special endpoint to reveal secret memory access"""
        # Add your secret reveal logic here
        return Response({'message': 'Secret access granted'}, status=status.HTTP_200_OK)