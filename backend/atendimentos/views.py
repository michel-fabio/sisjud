from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Atendimento, AreaJuridica, Assunto, MotivoCancelamento
from .serializers import AtendimentoSerializer, AreaJuridicaSerializer, AssuntoSerializer, AtendimentoPendenteSerializer, MotivoCancelamentoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as drf_status
from datetime import datetime

class AtendimentoViewSet(viewsets.ModelViewSet):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Atendimento.objects.filter(cliente=self.request.user)\
            .select_related('area_juridica', 'assunto', 'advogado')\
            .order_by('-data_atendimento')
    
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
    
    @action(detail=False, methods=['get'], url_path='pendentes')
    def pendentes(self, request):
        pendentes = Atendimento.objects.filter(
            cliente=request.user,
            status='pendente'
        ).select_related('area_juridica')

        serializer = AtendimentoPendenteSerializer(pendentes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='cancelar')
    def cancelar_atendimento(self, request, pk=None):
        try:
            atendimento = self.get_object()

            if atendimento.cliente != request.user:
                return Response({'erro': 'Você não tem permissão para cancelar este atendimento.'}, status=403)

            if atendimento.status != 'pendente':
                return Response({'erro': 'Somente atendimentos com status pendente podem ser cancelados.'}, status=400)

            motivo = request.data.get('motivo')
            observacoes = request.data.get('observacoes', '')

            atendimento.status = 'cancelado'
            atendimento.anotacoes = f"Cancelado pelo cliente. Motivo: {motivo}\nObservações: {observacoes}"
            atendimento.save()

            return Response({'mensagem': 'Atendimento cancelado com sucesso.'}, status=drf_status.HTTP_200_OK)

        except Atendimento.DoesNotExist:
            return Response({'erro': 'Atendimento não encontrado.'}, status=404)

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
    
class MotivosCancelamentoView(APIView):
    def get(self, request):
        motivos = MotivoCancelamento.objects.all()
        serializer = MotivoCancelamentoSerializer(motivos, many=True)
        return Response(serializer.data)