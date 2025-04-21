# SISJUD ⚖️
Este projeto é uma aplicação web desenvolvida como trabalho de conclusão de curso de pós-graduação em Desenvolvimento Full Stack da Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)

# 🚀 Passo a passo de instalação

## Preparar ambiente do Backend

### 1. Clone este repositório
```bash
git clone https://github.com/michel-fabio/sisjud.git
cd sisjud/backend
```

### 2. Crie e ative o ambiente virtual

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

### 3. Instale as dependências
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Crie o arquivo .env com base no template
```bash
cp .env.example .env
```

#### 4.1 Edite as variáveis conforme necessário

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

```env
SECRET_KEY=sua_chave_gerada_aqui
```

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

```env
FIELD_ENCRYPTION_KEY=sua_chave_gerada_aqui
```


### 5. Crie as migrações com base nos models (no .gitignore as migrations não são versionadas)

```bash
python manage.py makemigrations usuarios atendimentos advogados core
```
### 6. Aplique as migrações no banco de dados

```bash
python manage.py migrate
```

### 7. Crie um superusuário (opcional, mas recomendado para acessar o admin)

```bash
python manage.py createsuperuser
```

### 8. Rode o servidor local

```bash
python manage.py runserver
```

### 9. Configurar o perfil de gestor do sistema

#### Acesse a url do backend para configurar os Usuários do sistema. Nela é possível criar perfil de Gestores e Advogados

## Preparar ambiente do Frontend

### 1. Acesse a pasta do frontend

```bash
cd ../frontend
```

### 2. Instale as dependências do projeto

```bash
npm install
```

### 3. Copie o arquivo .env_exemplo para .env:

```bash
cp .env_exemplo .env
```

### 4. Edite o .env com as configurações da API:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 5. Executando o projeto

```bash
npm start
```