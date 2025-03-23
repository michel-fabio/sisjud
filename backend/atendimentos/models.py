from django.db import models

from usuarios.models import Usuario
from advogados.models import Advogado

class Atendimento(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Aguardando Atendimento'),
        ('em_andamento', 'Em Atendimento'),
        ('finalizado', 'Finalizado'),
    ]

    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="atendimentos")
    advogado = models.ForeignKey(Advogado, on_delete=models.SET_NULL, null=True)
    area_juridica = models.CharField(max_length=100)
    assunto = models.TextField()
    data_atendimento = models.DateTimeField()
    valor_causa = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')

    def __str__(self):
        return f"Atendimento {self.id} - {self.area_juridica}"