from django.db import models

from django.contrib.auth.models import AbstractUser, Group, Permission

class Usuario(AbstractUser):
    TIPOS_USUARIO = [
        ('cliente', 'Cliente'),
        ('advogado', 'Advogado'),
        ('admin', 'Administrador'),
    ]
    
    tipo = models.CharField(max_length=10, choices=TIPOS_USUARIO)

    # Evita conflitos com os relacionamentos padrão do Django
    groups = models.ManyToManyField(Group, related_name="usuarios_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="usuarios_permissions_set", blank=True)