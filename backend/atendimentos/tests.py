from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from usuarios.models import Usuario
from advogados.models import Advogado
from .models import Atendimento, AreaJuridica, Assunto, MotivoCancelamento

class AtendimentoTests(APITestCase):

    def setUp(self):
        self.cliente = Usuario.objects.create_user(
            username='cliente@email.com',
            email='cliente@email.com',
            password='cliente123',
            first_name='Cliente',
            tipo='cliente'
        )
        self.advogado_user = Usuario.objects.create_user(
            username='adv@email.com',
            email='adv@email.com',
            password='adv123',
            first_name='Advogado',
            tipo='advogado'
        )
        self.advogado = Advogado.objects.create(
            usuario=self.advogado_user,
            numero_oab='9999',
            areas_atuacao='Família'
        )
        self.area = AreaJuridica.objects.create(nome='Família')
        self.assunto = Assunto.objects.create(area=self.area, titulo='Divórcio')

    def test_criar_atendimento(self):
        self.client.force_authenticate(user=self.cliente)
        data = {
            'area_juridica': self.area.id,
            'assunto': self.assunto.id,
            'data_atendimento': (timezone.now() + timedelta(days=1)).isoformat()
        }
        response = self.client.post('/api/atendimentos/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Atendimento.objects.filter(cliente=self.cliente).exists())
        self.assertIsNotNone(response.data.get('numero'))

    def test_listar_atendimentos_cliente(self):
        Atendimento.objects.create(
            cliente=self.cliente,
            area_juridica=self.area,
            assunto=self.assunto,
            data_atendimento=timezone.now() + timedelta(days=1),
            valor_causa=1000.00,
            status='pendente',
            numero_atendimento='25040001'
        )
        self.client.force_authenticate(user=self.cliente)
        response = self.client.get('/api/atendimentos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_listar_pendentes(self):
        Atendimento.objects.create(
            cliente=self.cliente,
            area_juridica=self.area,
            assunto=self.assunto,
            data_atendimento=timezone.now() + timedelta(days=1),
            valor_causa=0.00,
            status='pendente',
            numero_atendimento='25040001'
        )
        self.client.force_authenticate(user=self.cliente)
        response = self.client.get('/api/atendimentos/pendentes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_cancelar_atendimento_pendente(self):
        atendimento = Atendimento.objects.create(
            cliente=self.cliente,
            area_juridica=self.area,
            assunto=self.assunto,
            data_atendimento=timezone.now() + timedelta(days=1),
            valor_causa=0.00,
            status='pendente',
            numero_atendimento='25040001'
        )
        self.client.force_authenticate(user=self.cliente)
        url = f'/api/atendimentos/{atendimento.id}/cancelar/'
        data = {'motivo': 'Mudança de planos', 'observacoes': 'Outro advogado'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        atendimento.refresh_from_db()
        self.assertEqual(atendimento.status, 'cancelado')
        self.assertIn('Motivo: Mudança de planos', atendimento.anotacoes)

    def test_cancelar_outro_usuario(self):
        outro = Usuario.objects.create_user(
            username='outro@email.com',
            email='outro@email.com',
            password='outro123',
            first_name='Outro',
            tipo='cliente'
        )
        atendimento = Atendimento.objects.create(
            cliente=outro,
            area_juridica=self.area,
            assunto=self.assunto,
            data_atendimento=timezone.now() + timedelta(days=1),
            valor_causa=0.00,
            status='pendente',
            numero_atendimento='25040001'
        )
        self.client.force_authenticate(user=self.cliente)
        url = f'/api/atendimentos/{atendimento.id}/cancelar/'
        response = self.client.post(url, {'motivo': 'Teste'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_finalizar_atendimento_por_advogado(self):
        atendimento = Atendimento.objects.create(
            cliente=self.cliente,
            area_juridica=self.area,
            assunto=self.assunto,
            data_atendimento=timezone.now() + timedelta(days=1),
            valor_causa=0.00,
            status='em_andamento',
            numero_atendimento='25040001'
        )
        self.client.force_authenticate(user=self.advogado_user)
        url = f'/api/atendimentos/{atendimento.numero_atendimento}/finalizar/'
        data = {
            'status': 'finalizado_causa_ganha',
            'descricao': 'Processo concluído com sucesso.',
            'valor_causa': 5000.00,
            'numero_processo': '12345678'
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        atendimento.refresh_from_db()
        self.assertEqual(atendimento.status, 'finalizado_causa_ganha')
        self.assertEqual(atendimento.numero_processo, '12345678')

class AtendimentoOutrosEndpointsTests(APITestCase):

    def setUp(self):
        self.admin = Usuario.objects.create_user(
            username='admin@email.com',
            email='admin@email.com',
            password='admin123',
            first_name='Admin',
            tipo='admin'
        )
        self.cliente = Usuario.objects.create_user(
            username='cli@email.com',
            email='cli@email.com',
            password='cliente123',
            first_name='Cliente',
            tipo='cliente'
        )
        self.advogado_user = Usuario.objects.create_user(
            username='adv@email.com',
            email='adv@email.com',
            password='adv123',
            first_name='Advogado',
            tipo='advogado'
        )
        self.advogado = Advogado.objects.create(
            usuario=self.advogado_user,
            numero_oab='8888',
            areas_atuacao='Criminal, Cível'
        )

        self.area1 = AreaJuridica.objects.create(nome='Criminal')
        self.area2 = AreaJuridica.objects.create(nome='Cível')
        self.assunto1 = Assunto.objects.create(area=self.area1, titulo='Crimes')
        self.assunto2 = Assunto.objects.create(area=self.area2, titulo='Indenização')

    def test_dashboard_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/atendimentos/dashboard-admin/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_mes', response.data)
        self.assertIn('clientes', response.data)
        self.assertIn('advogados', response.data)

    def test_listar_areas_juridicas(self):
        self.client.force_authenticate(user=self.cliente)
        response = self.client.get('/api/atendimentos/areas/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 2)

    def test_listar_assuntos_sem_filtro(self):
        self.client.force_authenticate(user=self.cliente)
        response = self.client.get('/api/atendimentos/assuntos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 2)

    def test_listar_assuntos_filtrando_por_area(self):
        self.client.force_authenticate(user=self.cliente)
        url = f'/api/atendimentos/assuntos/?area={self.area1.id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['titulo'], 'Crimes')

    def test_listar_motivos_cancelamento(self):
        MotivoCancelamento.objects.create(descricao='Motivo A')
        MotivoCancelamento.objects.create(descricao='Motivo B')
        self.client.force_authenticate(user=self.cliente)
        response = self.client.get('/api/atendimentos/motivos-cancelamento/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 2)