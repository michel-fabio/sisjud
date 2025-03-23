from rest_framework import serializers
from .models import Atendimento, AreaJuridica, Assunto

class AtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atendimento
        fields = '__all__'
        read_only_fields = ['cliente', 'valor_causa', 'status']

class AreaJuridicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaJuridica
        fields = ['id', 'nome']

class AssuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assunto
        fields = ['id', 'titulo', 'area']