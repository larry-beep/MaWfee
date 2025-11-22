from django.urls import path
from . import views

urlpatterns = [
    path('api/settings/', views.settings_view, name='settings'),
]