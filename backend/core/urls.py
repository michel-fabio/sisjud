from django.urls import path
from .views import TesteEnvioEmailView

urlpatterns = [
    path("teste-email/", TesteEnvioEmailView.as_view(), name="teste-envio-email"),
]