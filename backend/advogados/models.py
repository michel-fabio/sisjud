from django.db import models

from usuarios.models import Usuario

class Advogado(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    numero_oab = models.CharField(max_length=20, unique=True)
    areas_atuacao = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.usuario.username} - OAB {self.numero_oab}"
