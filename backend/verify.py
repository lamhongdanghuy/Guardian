from flask import Flask, request, url_for
import smtplib
from email.mime.text import MIMEText
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import os

#Generate a random secret key
secret_key = os.urandom(24)

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key

#Create URLSafeTimedSerializer object
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return '<form action="/" method="POST"><input name="email"><input type="submit"></form>'

    email = request.form['email']
    token = s.dumps(email, salt='email-confirm')

    link = url_for('confirm_email', token=token, _external=True)

    msg_body = 'Click the following link to confirm your email: {}'.format(link)

    send_email(email, 'Confirm Email', msg_body)

    return '<h1>Email verification link sent to {}</h1>'.format(email)

def send_email(to_email, subject, body):
    #SMTP server configuration
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465
    sender_email = 'phuonghaodinh2002@gmail.com'
    password = 'snmz oioc xwoa nvhp'

    #Create a text object
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = to_email

    try:
        #Connect to the SMTP server
        server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        
        #Logging in to email account
        server.login(sender_email, password)
        
        #Send the email
        server.sendmail(sender_email, to_email, msg.as_string())
        
        print('Email sent successfully!')
        
    except Exception as e:
        print(f'An error occurred: {e}')
    
    finally:
        #Close the connection to the SMTP server
        server.quit()

@app.route('/confirm_email/<token>')
def confirm_email(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
    except SignatureExpired:
        return '<h1>The token is expired!</h1>'
    return '<h1>The email is confirmed!</h1>'

if __name__ == '__main__':
    app.run(debug=True)