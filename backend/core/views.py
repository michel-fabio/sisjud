from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import enviar_email
from rest_framework.permissions import IsAdminUser

class TesteEnvioEmailView(APIView):
    permission_classes = [IsAdminUser]  # restrito a admins

    def post(self, request):
        destinatario = request.data.get("destinatario")
        assunto = request.data.get("assunto", "Teste de E-mail")
        corpo = request.data.get("corpo", "<p>Este é um teste de envio de e-mail.</p>")

        if not destinatario:
            return Response({"erro": "Campo 'destinatario' é obrigatório."}, status=400)

        try:
            enviar_email(destinatario, assunto, corpo)
            return Response({"mensagem": "E-mail enviado com sucesso."})
        except Exception as e:
            return Response({"erro": str(e)}, status=500)
