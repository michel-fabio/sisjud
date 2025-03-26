from django.contrib import admin
from .models import Usuario
from django.contrib.auth.admin import UserAdmin

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ('id', 'username', 'email', 'tipo', 'is_active', 'is_staff')
    list_filter = ('tipo', 'is_staff', 'is_active')
    fieldsets = (
    (None, {'fields': ('username', 'email', 'first_name', 'password', 'tipo')}),
    ('Permissões', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'tipo', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('id',)