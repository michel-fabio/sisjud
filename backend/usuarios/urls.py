from django.urls import path
from .views import CadastroCliente, UsuarioLogado

urlpatterns = [
    path('register/', CadastroCliente.as_view(), name='register'),
    path('usuario-logado/', UsuarioLogado.as_view(), name='usuario-logado'),
]