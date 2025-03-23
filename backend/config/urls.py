from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny

from atendimentos.views import AtendimentoViewSet
from processos.views import ProcessoViewSet

# Criando o roteador da API
router = DefaultRouter()
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
    path('api/', include('usuarios.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # URLs do Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc'),
]
