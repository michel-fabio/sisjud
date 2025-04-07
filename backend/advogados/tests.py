from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from usuarios.models import Usuario
from .models import Advogado

class AdvogadoTests(APITestCase):

    def setUp(self):
        self.admin = Usuario.objects.create_user(
            username='admin@email.com',
            email='admin@email.com',
            password='admin123',
            first_name='Administrador',
            tipo='admin'
        )
        self.cliente = Usuario.objects.create_user(
            username='cliente@email.com',
            email='cliente@email.com',
            password='cliente123',
            first_name='Cliente',
            tipo='cliente'
        )
        self.url = reverse('advogado-list')

    def test_cadastro_advogado_sucesso(self):
        self.client.force_authenticate(user=self.admin)
        data = {
            "nome": "Dr. João",
            "email": "joao@oab.com",
            "senha": "senha123",
            "numero_oab": "12345",
            "areas_atuacao": "Direito Civil, Direito Penal"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Advogado.objects.filter(numero_oab="12345").exists())

    def test_cadastro_por_usuario_nao_admin(self):
        self.client.force_authenticate(user=self.cliente)
        data = {
            "nome": "Dr. João",
            "email": "joao@oab.com",
            "senha": "senha123",
            "numero_oab": "12345",
            "areas_atuacao": "Direito Civil"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cadastro_com_campos_incompletos(self):
        self.client.force_authenticate(user=self.admin)
        data = {
            "nome": "Dr. João",
            "email": "joao@oab.com",
            "senha": "senha123",
            # numero_oab está faltando
            "areas_atuacao": "Direito Civil"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cadastro_com_email_existente(self):
        self.client.force_authenticate(user=self.admin)
        Usuario.objects.create_user(
            username="joao@oab.com",
            email="joao@oab.com",
            password="qualquer",
            first_name="João",
            tipo="advogado"
        )
        data = {
            "nome": "Dr. João",
            "email": "joao@oab.com",  # já existe
            "senha": "senha123",
            "numero_oab": "12345",
            "areas_atuacao": "Direito Civil"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("erro", response.data)

    def test_serializer_converte_lista_para_string(self):
        self.client.force_authenticate(user=self.admin)
        data = {
            "nome": "Dra. Ana",
            "email": "ana@oab.com",
            "senha": "senha123",
            "numero_oab": "54321",
            "areas_atuacao": ["Direito do Trabalho", "Direito Ambiental"]
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        advogado = Advogado.objects.get(numero_oab="54321")
        self.assertIn("Direito do Trabalho", advogado.areas_atuacao)
        self.assertIn("Direito Ambiental", advogado.areas_atuacao)

    def test_listagem_advogados_autenticado(self):
        advogado_user = Usuario.objects.create_user(
            username="adv1@teste.com",
            email="adv1@teste.com",
            password="senha123",
            first_name="Advogado 1",
            tipo="advogado"
        )
        Advogado.objects.create(usuario=advogado_user, numero_oab="789", areas_atuacao="Direito Civil")
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
