from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtendimentoViewSet, AreaJuridicaViewSet, AssuntoViewSet, MotivoCancelamentoViewSet

router = DefaultRouter()
router.register(r'atendimentos', AtendimentoViewSet)
router.register(r'areas', AreaJuridicaViewSet)
router.register(r'assuntos', AssuntoViewSet)
router.register(r'motivos-cancelamento', MotivoCancelamentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
