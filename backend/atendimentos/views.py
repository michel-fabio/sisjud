from django.shortcuts import render
from rest_framework import viewsets
from .models import Atendimento, AreaJuridica, Assunto
from .serializers import AtendimentoSerializer, AreaJuridicaSerializer, AssuntoSerializer
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

class AtendimentoViewSet(viewsets.ModelViewSet):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        data_atendimento = self.request.data.get('data_atendimento')
        
        if not data_atendimento:
            raise serializers.ValidationError("Data do atendimento é obrigatória.")

        # Converte string ISO para datetime
        data_obj = datetime.fromisoformat(data_atendimento)

        ano = str(data_obj.year)[-2:]  # últimos dois dígitos do ano
        data_str = data_obj.strftime('%d%m')  # formato: 2403

        prefixo = f"{ano}{data_str}"  # Ex: 250324

        # Busca quantos atendimentos já existem com esse prefixo
        existentes = Atendimento.objects.filter(numero_atendimento__startswith=prefixo).count()
        indice = f"{existentes + 1:04d}"  # sempre 4 dígitos

        numero_gerado = f"{prefixo}{indice}"  # Ex: 2503240001

        serializer.save(
            cliente=user,
            status='pendente',
            valor_causa=0.00,
            numero_atendimento=numero_gerado
        )

class AreaJuridicaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AreaJuridica.objects.all()
    serializer_class = AreaJuridicaSerializer

class AssuntoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Assunto.objects.all()
    serializer_class = AssuntoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        area_id = self.request.query_params.get('area')
        if area_id:
            queryset = queryset.filter(area_id=area_id)
        return queryset