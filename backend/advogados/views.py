import random
import string
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Advogado, Usuario
from .serializers import AdvogadoSerializer
from core.utils import enviar_email

class AdvogadoViewSet(viewsets.ModelViewSet):
    queryset = Advogado.objects.all()
    serializer_class = AdvogadoSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if request.user.tipo != 'admin':
            return Response({"erro": "Acesso não autorizado."}, status=status.HTTP_403_FORBIDDEN)

        nome = request.data.get("nome")
        email = request.data.get("email")
        numero_oab = request.data.get("numero_oab")
        areas_atuacao = request.data.get("areas_atuacao")

        if not all([nome, email, numero_oab, areas_atuacao]):
            return Response({"erro": "Todos os campos são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        if Usuario.objects.filter(email=email).exists():
            return Response({"erro": "Já existe um usuário com esse email."}, status=status.HTTP_400_BAD_REQUEST)

        # Gera uma senha aleatória no backend
        senha = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

        usuario = Usuario.objects.create_user(
            username=email,
            email=email,
            password=senha,
            first_name=nome,
            tipo='advogado'
        )

        advogado = Advogado.objects.create(
            usuario=usuario,
            numero_oab=numero_oab,
            areas_atuacao=areas_atuacao,
        )

        try:
            enviar_email(
                email,
                "Cadastro no Sistema de Atendimento Jurídico",
                f"""
                <p>Olá {nome},</p>
                <p>Você foi cadastrado como advogado no nosso sistema.</p>
                <p><strong>Email:</strong> {email}<br>
                <strong>Senha:</strong> {senha}</p>
                <p>Recomendamos que altere sua senha após o primeiro login.</p>
                <br>
                <p>Atenciosamente,<br>Sistema de Atendimento Jurídico</p>
                """
            )
        except Exception as e:
            print(f"Erro ao enviar e-mail para advogado: {str(e)}")

        return Response({
            "mensagem": "Advogado cadastrado com sucesso.",
            "advogado_id": advogado.id
        }, status=status.HTTP_201_CREATED)
