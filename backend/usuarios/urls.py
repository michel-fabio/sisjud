from django.urls import path
from .views import CadastroCliente

urlpatterns = [
    path('register/', CadastroCliente.as_view(), name='register'),
]