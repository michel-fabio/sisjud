from django.db import models

from atendimentos.models import Atendimento

class Processo(models.Model):
    atendimento = models.OneToOneField(Atendimento, on_delete=models.CASCADE)
    numero_processo = models.CharField(max_length=50, unique=True)
    status_processo = models.CharField(max_length=100)

    def __str__(self):
        return f"Processo {self.numero_processo}"
