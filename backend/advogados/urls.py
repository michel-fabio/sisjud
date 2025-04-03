from django.urls import path
from .views import CadastroAdvogadoAPIView

urlpatterns = [
    path('cadastrar/', CadastroAdvogadoAPIView.as_view(), name='cadastrar-advogado'),
]