from rest_framework import serializers
from .models import Atendimento, AreaJuridica, Assunto, MotivoCancelamento

class AtendimentoSerializer(serializers.ModelSerializer):
    area = serializers.CharField(source='area_juridica.nome', read_only=True)
    assunto_nome = serializers.CharField(source='assunto.titulo', read_only=True)
    advogado = serializers.CharField(source='advogado.usuario.get_full_name', default='', read_only=True)
    oab = serializers.CharField(source='advogado.numero_oab', default='', read_only=True)
    data = serializers.DateTimeField(source='data_atendimento', format="%d/%m/%Y", read_only=True)
    valor = serializers.DecimalField(source='valor_causa', max_digits=10, decimal_places=2, read_only=True)
    numero = serializers.CharField(source='numero_atendimento', default='', read_only=True)
    status_display = serializers.SerializerMethodField()

    class Meta:
        model = Atendimento
        fields = [
            'id',
            'area_juridica', 'assunto', 'data_atendimento',  # campos de entrada (write)
            'area', 'assunto_nome', 'advogado', 'oab', 'data',
            'valor', 'status', 'status_display', 'numero'
        ]

    def get_status_display(self, obj):
        return obj.get_status_display()

class AtendimentoPendenteSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    value = serializers.IntegerField(source='id')

    class Meta:
        model = Atendimento
        fields = ['label', 'value']

    def get_label(self, obj):
        return f"{obj.numero_atendimento} - {obj.area_juridica.nome}"

class AreaJuridicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaJuridica
        fields = ['id', 'nome']

class AssuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assunto
        fields = ['id', 'titulo', 'area']

class MotivoCancelamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotivoCancelamento
        fields = ['id', 'descricao']