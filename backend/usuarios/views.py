from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UsuarioSerializer

class CadastroCliente(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data['username'] = data.get('email')  # define username como email
        data['tipo'] = 'cliente'  # define tipo padrão como cliente

        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cadastro realizado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UsuarioLogado(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data)