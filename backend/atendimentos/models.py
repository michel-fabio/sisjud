from django.db import models
from encrypted_model_fields.fields import EncryptedTextField
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
        # Etapas iniciais
        ('pendente', 'Agendamento marcado, aguardando atendimento'),
        ('em_analise', 'Em Análise Inicial'),
        ('aguardando_documentos', 'Aguardando Documentos'),
         
        # Atendimento em curso
        ('em_andamento', 'Em Atendimento'),
        ('aguardando_retorno_cliente', 'Aguardando Retorno do Cliente'),
        ('em_negociacao', 'Em Negociação/Conciliação'),

        # Etapas judiciais / tribunal
        ('aguardando_distribuicao', 'Aguardando Distribuição'),
        ('aguardando_audiencia', 'Aguardando Audiência'),
        ('aguardando_sentenca', 'Aguardando Sentença'),
        ('sentenca_proferida', 'Sentença Proferida'),
        ('em_recurso', 'Em Fase Recursal'),
        ('aguardando_transito_em_julgado', 'Aguardando Trânsito em Julgado'),
        ('aguardando_cumprimento_sentenca', 'Aguardando Cumprimento de Sentença'),

        # Finalizações
        ('finalizado_causa_ganha', 'Finalizado com Causa Ganha'),
        ('finalizado_sem_causa_ganha', 'Finalizado sem Causa Ganha'),
        ('finalizado_acordo', 'Finalizado com Acordo'),
        ('encerrado_por_inatividade', 'Encerrado por Inatividade'),
        ('cancelado', 'Cancelado'),
        ('rejeitado', 'Rejeitado pelo Escritório'),
    ]

    numero_atendimento = models.CharField(max_length=20, unique=True, blank=True, null=True)
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="atendimentos")
    advogado = models.ForeignKey(Advogado, on_delete=models.SET_NULL, null=True, blank=True)
    area_juridica = models.ForeignKey(AreaJuridica, on_delete=models.CASCADE)
    assunto = models.ForeignKey(Assunto, on_delete=models.CASCADE)
    data_atendimento = models.DateTimeField()
    valor_causa = models.DecimalField(max_digits=10, decimal_places=2)
    numero_processo = models.CharField(max_length=25, blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pendente')
    anotacoes = EncryptedTextField(blank=True, null=True)

    def __str__(self):
        return f"Atendimento {self.id} - {self.area_juridica}"
    
class MotivoCancelamento(models.Model):
    descricao = models.CharField(max_length=100)

    def __str__(self):
        return self.descricao