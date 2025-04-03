from rest_framework import serializers
from .models import Advogado

class AdvogadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advogado
        fields = '__all__'

    def validate_areas_atuacao(self, value):
        if isinstance(value, list):
            return ', '.join(value)
        return value