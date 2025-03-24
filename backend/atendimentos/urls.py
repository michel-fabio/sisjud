from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtendimentoViewSet, AreaJuridicaViewSet, AssuntoViewSet, MotivosCancelamentoView

router = DefaultRouter()
router.register(r'atendimentos', AtendimentoViewSet)
router.register(r'areas', AreaJuridicaViewSet)
router.register(r'assuntos', AssuntoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('motivos-cancelamento/', MotivosCancelamentoView.as_view()),
]
