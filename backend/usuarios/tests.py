from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from usuarios.models import Usuario
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings

class UsuarioTests(APITestCase):

    def setUp(self):
        self.cliente = Usuario.objects.create_user(
            username='cliente@email.com',
            email='cliente@email.com',
            password='cliente123',
            first_name='Cliente',
            tipo='cliente'
        )

        self.admin = Usuario.objects.create_user(
            username='admin@email.com',
            email='admin@email.com',
            password='admin123',
            first_name='Admin',
            tipo='admin'
        )

        self.base = '/api/usuarios'

    def autenticar(self, usuario):
        refresh = RefreshToken.for_user(usuario)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')

    def test_cadastro_cliente_sucesso(self):
        data = {
            "email": "novo@email.com",
            "password": "novaSenha123",
            "nome": "Novo Cliente"
        }
        response = self.client.post(f'{self.base}/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Usuario.objects.filter(email="novo@email.com").exists())

    def test_cadastro_cliente_faltando_dados(self):
        data = {
            "email": "sem@senha.com",
        }
        response = self.client.post(f'{self.base}/register/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_login_com_sucesso(self):
        data = {
            "username": self.cliente.email,
            "password": "cliente123"
        }
        response = self.client.post('/api/token/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

        token = response.data['access']
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

        self.assertEqual(payload['tipo'], self.cliente.tipo)
        self.assertEqual(payload['nome'], self.cliente.first_name)

    def test_usuario_logado(self):
        self.autenticar(self.cliente)
        response = self.client.get(f'{self.base}/usuario-logado/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.cliente.email)

    def test_listar_clientes(self):
        self.autenticar(self.admin)
        response = self.client.get(f'{self.base}/clientes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)