from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

Usuario = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    nome = serializers.CharField(write_only=True, required=False)  # campo extra para entrada

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'tipo', 'password', 'nome', 'first_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        nome = validated_data.pop('nome', '')  # pega o nome enviado
        usuario = Usuario(**validated_data)
        usuario.first_name = nome  # salva no campo first_name
        usuario.set_password(password)
        usuario.save()
        return usuario
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['tipo'] = user.tipo
        token['nome'] = user.first_name
        return token