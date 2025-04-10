from django.db import models
from encrypted_model_fields.fields import EncryptedCharField

class ServidorEmail(models.Model):
    nome = models.CharField(max_length=100)
    host = models.CharField(max_length=255)
    porta = models.PositiveIntegerField(default=587)
    usuario = models.CharField(max_length=255)
    senha = EncryptedCharField(max_length=255)
    usar_tls = models.BooleanField(default=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nome} ({self.usuario})"
    
class LogEnvioEmail(models.Model):
    servidor = models.ForeignKey(ServidorEmail, on_delete=models.SET_NULL, null=True)
    destinatario = models.EmailField()
    assunto = models.CharField(max_length=255)
    sucesso = models.BooleanField(default=False)
    erro = models.TextField(blank=True, null=True)
    data_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.destinatario} - {self.assunto} - {'✅' if self.sucesso else '❌'}"
