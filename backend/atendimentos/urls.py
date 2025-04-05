from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtendimentoViewSet, AreaJuridicaViewSet, AssuntoViewSet, MotivoCancelamentoViewSet

router = DefaultRouter()
router.register(r'atendimentos', AtendimentoViewSet, basename='atendimentos')
router.register(r'areas', AreaJuridicaViewSet, basename='areas')
router.register(r'assuntos', AssuntoViewSet, basename='assuntos')
router.register(r'motivos-cancelamento', MotivoCancelamentoViewSet, basename='motivo-cancelamento')

urlpatterns = [
    path('', include(router.urls)),
]