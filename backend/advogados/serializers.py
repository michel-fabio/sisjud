from rest_framework import serializers
from .models import Advogado

class AdvogadoSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(source='usuario.first_name', read_only=True)
    email = serializers.EmailField(source='usuario.email', read_only=True)
    class Meta:
        model = Advogado
        fields = ['id', 'nome', 'email', 'numero_oab', 'areas_atuacao']

    def validate_areas_atuacao(self, value):
        if isinstance(value, list):
            return ', '.join(value)
        return value