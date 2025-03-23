from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UsuarioSerializer

class CadastroCliente(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = data.get('email')  # define username como email
        data['tipo'] = 'cliente'  # define tipo padrão como cliente

        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cadastro realizado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)