from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtendimentoViewSet

router = DefaultRouter()
router.register(r'', AtendimentoViewSet, basename='atendimentos')

urlpatterns = [
    path('', include(router.urls)),
]