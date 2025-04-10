from django.contrib import admin
from .models import ServidorEmail, LogEnvioEmail

@admin.register(ServidorEmail)
class ServidorEmailAdmin(admin.ModelAdmin):
    list_display = ('nome', 'usuario', 'host', 'porta', 'usar_tls', 'ativo')

@admin.register(LogEnvioEmail)
class LogEnvioEmailAdmin(admin.ModelAdmin):
    list_display = ('destinatario', 'assunto', 'sucesso', 'data_envio')
    readonly_fields = ('servidor', 'destinatario', 'assunto', 'sucesso', 'erro', 'data_envio')
    ordering = ('-data_envio',)
