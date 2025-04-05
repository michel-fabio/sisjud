from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Processo
from .serializers import ProcessoSerializer

class ProcessoViewSet(viewsets.ModelViewSet):
    serializer_class = ProcessoSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'advogado'):
            return Processo.objects.filter(atendimento__advogado=user.advogado)
        elif user.tipo == 'cliente':
            return Processo.objects.filter(atendimento__cliente=user)
        return Processo.objects.none()