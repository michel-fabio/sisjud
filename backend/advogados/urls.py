from django.urls import path
from .views import CadastroAdvogadoAPIView, ListarAdvogadosAPIView

urlpatterns = [
    path('cadastrar/', CadastroAdvogadoAPIView.as_view(), name='cadastrar-advogado'),
    path('listar/', ListarAdvogadosAPIView.as_view(), name='listar-advogados'),
]