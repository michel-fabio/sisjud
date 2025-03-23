"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

from usuarios.views import UsuarioViewSet
from atendimentos.views import AtendimentoViewSet
from processos.views import ProcessoViewSet

# Criando o roteador da API
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'atendimentos', AtendimentoViewSet)
router.register(r'processos', ProcessoViewSet)

# Configuração do Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API Atendimento Jurídico",
        default_version='v1',
        description="Documentação interativa da API do Sistema de Atendimento Jurídico",
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # URLs do Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc'),
]
