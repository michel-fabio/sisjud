from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdvogadoViewSet

router = DefaultRouter()
router.register(r'', AdvogadoViewSet, basename='advogado')  # 👈 sem prefixo aqui

urlpatterns = [
    path('', include(router.urls)),  # 👈 include direto, sem prefixo adicional
]