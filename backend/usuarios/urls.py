from django.urls import path
from .views import CadastroCliente, UsuarioLogado, LoginAdvogadoView

urlpatterns = [
    path('register/', CadastroCliente.as_view(), name='register'),
    path('usuario-logado/', UsuarioLogado.as_view(), name='usuario-logado'),
    path('token/advogado/', LoginAdvogadoView.as_view(), name='token_advogado'),
]