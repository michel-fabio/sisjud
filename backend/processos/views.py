from django.shortcuts import render

from rest_framework import viewsets
from .models import Processo
from .serializers import ProcessoSerializer

class ProcessoViewSet(viewsets.ModelViewSet):
    queryset = Processo.objects.all()
    serializer_class = ProcessoSerializer
