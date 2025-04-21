# SISJUD ⚖️
Este projeto é uma aplicação web desenvolvida como trabalho de conclusão de curso de pós-graduação em Desenvolvimento Full Stack da Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)

# 🚀 Passo a passo de instalação

## 1. Preparar ambiente do Backend

### 1.1. Clone este repositório
```bash
git clone https://github.com/michel-fabio/sisjud.git
cd sisjud/backend
```

### 1.2. Crie e ative o ambiente virtual

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

### 1.3. Instale as dependências
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 1.4. Crie o arquivo .env com base no template
```bash
cp .env.example .env
```

#### 1.4.1 Edite as variáveis conforme necessário

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


### 1.5. Crie as migrações com base nos models (no .gitignore as migrations não são versionadas)

```bash
python manage.py makemigrations usuarios atendimentos advogados core
```
### 1.6. Aplique as migrações no banco de dados

```bash
python manage.py migrate
```

### 1.7. Crie um superusuário (opcional, mas recomendado para acessar o admin)

```bash
python manage.py createsuperuser
```

### 1.8. Rode o servidor local

```bash
python manage.py runserver
```

### 1.9. Configurar o perfil de gestor do sistema

#### Acesse a url do backend para configurar os Usuários do sistema. Nela é possível criar perfil de Gestores e Advogados

---

## 2. Preparar ambiente do Frontend

### 2.1. Acesse a pasta do frontend

```bash
cd ../frontend
```

### 2.2. Instale as dependências do projeto

```bash
npm install
```

### 2.3. Copie o arquivo .env_exemplo para .env:

```bash
cp .env_exemplo .env
```

### 2.4. Edite o .env com as configurações da API:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 2.5. Executando o projeto

```bash
npm start
```


# 🤝 Contribuindo com o projeto

Este guia explica como configurar seu ambiente local, seguir as boas práticas e usar o fluxo de trabalho baseado no GitFlow.

## 🚀 Branches principais

- `main`: Contém o código **estável e pronto para produção**.
- `desenvolvimento`: Contém o código **em desenvolvimento**, com recursos em andamento ou prontos para revisão.

---

## 🌿 GitFlow simplificado

### Features

Para cada nova funcionalidade, crie uma branch a partir de `desenvolvimento`:

```bash
git checkout desenvolvimento
git pull
git checkout -b feature/nome-da-funcionalidade
```

Após implementar e testar:

```bash
git add .
git commit -m "feat: descrição clara da funcionalidade"
git push origin feature/nome-da-funcionalidade
```

E abra um Pull Request para a branch desenvolvimento.

### Correções (Hotfix)

Para correções urgentes em produção, crie uma branch a partir de main:

```bash
git checkout main
git pull
git checkout -b hotfix/descricao-do-problema
```

Após corrigir e testar:


```bash
git commit -m "fix: descrição da correção"
git push origin hotfix/descricao-do-problema
```

Abra um Pull Request para main e também para desenvolvimento, garantindo que o bug fix vá para ambos os fluxos.

### Releases

Se necessário, crie uma branch de release a partir de desenvolvimento para ajustes finais e testes:

```bash
git checkout desenvolvimento
git checkout -b release/1.0.0
```

Depois de aprovado:

```bash
# Merge em main e tag
git checkout main
git merge release/1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"

# Merge em desenvolvimento
git checkout desenvolvimento
git merge release/1.0.0
```

## 🧪 Boas práticas

Escreva mensagens claras, utilizando commits semânticos (ex: feat:, fix:, docs:, test:).

Escreva código limpo, comentado e com testes sempre que possível.

Mantenha sua branch sincronizada com desenvolvimento durante o desenvolvimento.

Teste localmente antes de abrir o Pull Request.

## 📚 Documentação para uso de commits semânticos

Abaixo é enumerado os principais tipos de commits semânticos descritos na documentação do Angular Commit Message Guidelines:

1. build: Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm),
2. ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs);
3. docs: referem-se a inclusão ou alteração somente de arquivos de documentação;
4. feat: Tratam adições de novas funcionalidades ou de quaisquer outras novas implantações ao código;
5. fix: Essencialmente definem o tratamento de correções de bugs;
6. perf: Uma alteração de código que melhora o desempenho;
7. refactor: Tipo utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada;
8. style: Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc.);
9. test: Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD);
10. chore: Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas que realmente não entram em produção;
11. env: basicamente utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers.