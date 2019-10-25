sudo apt-get install uwsgi-core
sudo apt-get install uwsgi-plugin-python3
sudo apt-get install libapache2-mod-wsgi-py3
sudo ufw allow 8000

chmod +x app.py
chmod +x wsgi.py
sudo nano /etc/systemd/system/burgomaster.service
where is uwsgi
output past in ExecStart

systemctl enable burgomaster.service

[Unit]
Description=uWSGI instance to serve burgomaster
After=network.target

[Service]
User=areso
Group=areso
WorkingDirectory=/home/areso/git/1255-burgomaster/burgomaster-serverside
ExecStart=/usr/bin/uwsgi --ini /home/areso/git/1255-burgomaster/burgomaster-serverside/app.ini

[Install]
WantedBy=multi-user.target



<VirtualHost *>
    ServerName burgomaster.org
    <Directory /home/areso/git/1255-burgomaster/burgomaster-serverside>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>
    #WSGIDaemonProcess burgomaster python-home=/home/areso/.local/lib/python3.5 python-path=/home/areso/git/1255-burgomaster/burgomaster-serverside/
    #WSGIProcessGroup burgomaster
    WSGIScriptAlias / /home/areso/git/1255-burgomaster/burgomaster-serverside/wsgi.py
    #ProxyPass / uwsgi://127.0.0.1:8000
</VirtualHost>


useful commands:
sudo nano /etc/systemd/system/burgomaster.service
sudo systemctl daemon-reload
sudo systemctl restart burgomaster.service
sudo systemctl status service burgomaster.service


#LoadModule proxy_uwsgi_module modules/mod_proxy_uwsgi.so
sudo nano /etc/apache2/sites-available/burgomaster.org.conf
<VirtualHost *>
    ServerName burgomaster.org
    ProxyPass / uwsgi://127.0.0.1:8000
</VirtualHost>

sudo a2ensite burgomaster.org
sudo nano /etc/hosts 127.0.0.1 burgomaster.org
