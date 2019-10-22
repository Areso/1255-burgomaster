sudo apt-get install uwsgi-core
sudo apt-get install uwsgi-plugin-python3
chmod +x app.py
chmod +x wsgi.py
sudo nano /etc/systemd/system/burgomaster.service
where is uwsgi
output past in ExecStart
[Unit]
Description=uWSGI instance to serve burgomaster
After=network.target

[Service]
User=areso
Group=www-data
WorkingDirectory=/home/areso/git/1255-burgomaster/burgomaster-serverside
Environment="PATH=/home/areso/bin:/home/areso/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
ExecStart=/usr/bin/uwsgi uwsgi --ini /home/areso/git/1255-burgomaster/burgomaster-serverside/app.ini

[Install]
WantedBy=multi-user.target

useful commands:
sudo nano /etc/systemd/system/burgomaster.service
sudo systemctl daemon-reload
sudo systemctl restart burgomaster.service
sudo systemctl status service burgomaster.service
