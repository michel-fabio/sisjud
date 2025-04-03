from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Advogado, Usuario
from django.contrib.auth.models import User

class CadastroAdvogadoAPIView(APIView):
    def post(self, request):
        nome = request.data.get("nome")
        email = request.data.get("email")
        senha = request.data.get("senha")
        numero_oab = request.data.get("numero_oab")
        areas_atuacao = request.data.get("areas_atuacao")

        if not all([nome, email, senha, numero_oab, areas_atuacao]):
            return Response({"erro": "Todos os campos são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        if Usuario.objects.filter(email=email).exists():
            return Response({"erro": "Já existe um usuário com esse email."}, status=status.HTTP_400_BAD_REQUEST)

        usuario = Usuario.objects.create_user(
            username=email,
            email=email,
            password=senha,
            first_name=nome.split()[0],
            last_name=' '.join(nome.split()[1:]),
            tipo='advogado'
        )

        advogado = Advogado.objects.create(
            usuario=usuario,
            numero_oab=numero_oab,
            areas_atuacao=areas_atuacao,
        )

        return Response({
            "mensagem": "Advogado cadastrado com sucesso.",
            "advogado_id": advogado.id
        }, status=status.HTTP_201_CREATED)