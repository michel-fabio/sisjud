from django.contrib.auth import get_user_model
from django.db import models
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Atendimento, AreaJuridica, Assunto, MotivoCancelamento
from advogados.models import Advogado
from .serializers import AtendimentoSerializer, AreaJuridicaSerializer, AssuntoSerializer, AtendimentoPendenteSerializer, MotivoCancelamentoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as drf_status
from datetime import datetime
from django.utils.timezone import now
from rest_framework.permissions import IsAuthenticated




class AtendimentoViewSet(viewsets.ModelViewSet):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Atendimento.objects.filter(cliente=self.request.user)\
            .select_related('area_juridica', 'assunto', 'advogado')\
            .order_by('-data_atendimento')
    
    @action(detail=False, methods=['get'], url_path='status')
    def listar_status(self, request):
        status_list = [
            {'valor': key, 'rotulo': label}
            for key, label in Atendimento.STATUS_CHOICES
        ]
        return Response(status_list)
    
    def perform_create(self, serializer):
        user = self.request.user
        data_atendimento = self.request.data.get('data_atendimento')
        
        if not data_atendimento:
            return Response({'erro': 'Data do atendimento é obrigatória.'}, status=400)

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
    
    @action(detail=False, methods=['get'], url_path='hoje-advogado')
    def atendimentos_hoje_advogado(self, request):
        if not hasattr(request.user, 'advogado'):
            return Response({'erro': 'Usuário não é um advogado.'}, status=403)

        hoje = now().date()
        advogado = request.user.advogado
        areas = [a.strip() for a in advogado.areas_atuacao.split(',')]

        atendimentos = Atendimento.objects.filter(
            advogado__isnull=True,
            data_atendimento__date=hoje,
            area_juridica__nome__in=areas
        ).select_related('cliente', 'area_juridica', 'assunto')

        dados = [
            {
                'id': atendimento.id,
                'data': atendimento.data_atendimento.strftime('%d/%m/%Y %H:%M'),
                'numero': atendimento.numero_atendimento,
                'area': atendimento.area_juridica.nome,
                'assunto': atendimento.assunto.titulo,
                'status': atendimento.status,
                'status_display': atendimento.get_status_display(),
                'valor_causa': atendimento.valor_causa,
                'numero_processo': atendimento.numero_processo,
                'anotacoes': atendimento.anotacoes,
                'cliente': atendimento.cliente.first_name
            }
            for atendimento in atendimentos
        ]
        return Response(dados)
    
    @action(detail=True, methods=['patch'], url_path='finalizar')
    def finalizar(self, request, pk=None):
        try:
            atendimento = Atendimento.objects.get(numero_atendimento=pk)

            atendimento.status = request.data.get('status')
            atendimento.advogado = request.user.advogado

            atendimento.numero_processo = request.data.get('numero_processo', '')
            atendimento.valor_causa = request.data.get('valor_causa', None)
            atendimento.anotacoes = request.data.get('descricao', '')

            atendimento.save()
            return Response({'mensagem': 'Atendimento finalizado com sucesso.'})
        except Atendimento.DoesNotExist:
            return Response({'erro': 'Atendimento não encontrado.'}, status=404)
        except Exception as e:
            return Response({'erro': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'], url_path='finalizados')
    def atendimentos_finalizados(self, request):
        if not hasattr(request.user, 'advogado'):
            return Response({'erro': 'Usuário não é um advogado.'}, status=403)

        atendimentos = Atendimento.objects.filter(
            advogado=request.user.advogado
        ).select_related('cliente', 'area_juridica', 'assunto')

        dados = [
            {
                'data': atendimento.data_atendimento.strftime('%d/%m/%Y %H:%M'),
                'numero': atendimento.numero_atendimento,
                'area': atendimento.area_juridica.nome,
                'assunto': atendimento.assunto.titulo,
                'status': atendimento.status,
                'status_display': atendimento.get_status_display(),
                'valor_causa': atendimento.valor_causa,
                'numero_processo': atendimento.numero_processo,
                'anotacoes': atendimento.anotacoes,
                'cliente': atendimento.cliente.first_name
            }
            for atendimento in atendimentos
        ]
        return Response(dados)
    
    @action(detail=False, methods=['get'], url_path='dashboard-admin')
    def dashboard_admin(self, request):
        hoje = now()
        mes_atual = hoje.month
        ano_atual = hoje.year

        atendimentos = Atendimento.objects.all()
        finalizados = atendimentos.filter(status__startswith='finalizado')

        total_mes = atendimentos.filter(
            data_atendimento__month=mes_atual,
            data_atendimento__year=ano_atual
        ).count()

        em_andamento = atendimentos.exclude(
            status__in=[
                'finalizado_causa_ganha',
                'finalizado_sem_causa_ganha',
                'finalizado_acordo',
                'encerrado_por_inatividade',
                'cancelado',
                'rejeitado'
            ]
        ).exclude(numero_processo__isnull=True).exclude(numero_processo__exact='').count()
        causas_ganhas = finalizados.filter(status='finalizado_causa_ganha').count()

        honorarios = finalizados.aggregate(models.Sum('valor_causa'))['valor_causa__sum'] or 0

        Usuario = get_user_model()
        clientes = Usuario.objects.filter(tipo='cliente').count()
        advogados = Advogado.objects.count()

        return Response({
            'total_mes': total_mes,
            'em_andamento': em_andamento,
            'causas_ganhas': causas_ganhas,
            'honorarios': honorarios,
            'clientes': clientes,
            'advogados': advogados
        })



class AreaJuridicaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AreaJuridica.objects.all()
    serializer_class = AreaJuridicaSerializer
    permission_classes = [IsAuthenticated]

class AssuntoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Assunto.objects.all()
    serializer_class = AssuntoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        area_id = self.request.query_params.get('area')
        if area_id:
            queryset = queryset.filter(area_id=area_id)
        return queryset
    
class MotivoCancelamentoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MotivoCancelamento.objects.all()
    serializer_class = MotivoCancelamentoSerializer
    permission_classes = [IsAuthenticated]