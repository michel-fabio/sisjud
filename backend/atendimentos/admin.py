from django.contrib import admin
from .models import AreaJuridica, Assunto, Atendimento

@admin.register(AreaJuridica)
class AreaJuridicaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')

@admin.register(Assunto)
class AssuntoAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'area')

@admin.register(Atendimento)
class AtendimentoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'area_juridica', 'assunto', 'data_atendimento', 'status', 'numero_processo', 'numero_atendimento')
    list_filter = ('status', 'area_juridica')
    search_fields = ('cliente__username', 'assunto__titulo', 'area_juridica__nome', 'numero_processo', 'numero_atendimento')