import smtplib
from email.mime.text import MIMEText
from .models import ServidorEmail, LogEnvioEmail

def enviar_email(destinatario, assunto, corpo):
    servidor = ServidorEmail.objects.filter(ativo=True).first()

    if not servidor:
        raise Exception("Nenhuma configuração de servidor SMTP ativa encontrada.")

    msg = MIMEText(corpo, 'html')
    msg['Subject'] = assunto
    msg['From'] = servidor.usuario
    msg['To'] = destinatario

    sucesso = False
    erro = None

    try:
        with smtplib.SMTP(servidor.host, servidor.porta) as smtp:
            if servidor.usar_tls:
                smtp.starttls()
            smtp.login(servidor.usuario, servidor.senha)
            smtp.send_message(msg)
            sucesso = True
    except Exception as e:
        erro = str(e)

    # salva log
    LogEnvioEmail.objects.create(
        servidor=servidor,
        destinatario=destinatario,
        assunto=assunto,
        sucesso=sucesso,
        erro=erro
    )

    if not sucesso:
        raise Exception(f"Erro ao enviar e-mail: {erro}")
