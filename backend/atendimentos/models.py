from django.db import models

from usuarios.models import Usuario
from advogados.models import Advogado

class AreaJuridica(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class Assunto(models.Model):
    area = models.ForeignKey(AreaJuridica, on_delete=models.CASCADE, related_name="assuntos")
    titulo = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.titulo} ({self.area.nome})"

class Atendimento(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Aguardando Atendimento'),
        ('em_andamento', 'Em Atendimento'),
        ('finalizado', 'Finalizado'),
        ('cancelado', 'Cancelado'),
    ]

    numero_atendimento = models.CharField(max_length=20, unique=True, blank=True, null=True)
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="atendimentos")
    advogado = models.ForeignKey(Advogado, on_delete=models.SET_NULL, null=True)
    area_juridica = models.ForeignKey(AreaJuridica, on_delete=models.CASCADE)
    assunto = models.ForeignKey(Assunto, on_delete=models.CASCADE)
    data_atendimento = models.DateTimeField()
    valor_causa = models.DecimalField(max_digits=10, decimal_places=2)
    numero_processo = models.CharField(max_length=25, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    anotacoes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Atendimento {self.id} - {self.area_juridica}"
    
class MotivoCancelamento(models.Model):
    descricao = models.CharField(max_length=100)

    def __str__(self):
        return self.descricao