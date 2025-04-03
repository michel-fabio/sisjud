from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UsuarioSerializer
from usuarios.models import Usuario

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
    
class LoginAdvogadoView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({'detail': 'Usuário não encontrado.'}, status=status.HTTP_401_UNAUTHORIZED)

        if usuario.tipo not in ['advogado', 'admin']:
            return Response({'detail': 'Tipo de usuário não autorizado para esta área.'}, status=status.HTTP_403_FORBIDDEN)

        UserModel = get_user_model()
        user = UserModel.objects.get(email=email)
        if not user.check_password(password):
            return Response({'detail': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class ListarClientesAPIView(ListAPIView):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        return Usuario.objects.filter(tipo='cliente')