from django.contrib import admin

from .models import Advogado

@admin.register(Advogado)
class AdvogadoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'areas_atuacao')