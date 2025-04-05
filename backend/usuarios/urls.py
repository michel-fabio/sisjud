from django.urls import path
from .views import CadastroCliente, UsuarioLogado, CustomLoginView, ListarClientesAPIView

urlpatterns = [
    path('register/', CadastroCliente.as_view(), name='register'),
    path('usuario-logado/', UsuarioLogado.as_view(), name='usuario-logado'),
    path('token/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('clientes/', ListarClientesAPIView.as_view(), name='listar-clientes'),
]