from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProcessoViewSet

router = DefaultRouter()
router.register(r'', ProcessoViewSet, basename='processo')

urlpatterns = [
    path('', include(router.urls)),
]