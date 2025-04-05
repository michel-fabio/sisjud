from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtendimentoViewSet, AreaJuridicaViewSet, AssuntoViewSet, MotivoCancelamentoViewSet

router = DefaultRouter()
router.register(r'', AtendimentoViewSet, basename='atendimento')
router.register(r'areas', AreaJuridicaViewSet, basename='area-juridica')
router.register(r'assuntos', AssuntoViewSet, basename='assunto')
router.register(r'motivos-cancelamento', MotivoCancelamentoViewSet, basename='motivo-cancelamento')

urlpatterns = [
    path('', include(router.urls)),
]