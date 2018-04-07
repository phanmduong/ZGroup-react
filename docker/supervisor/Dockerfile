FROM quanca/laravel

COPY ./supervisor.conf /etc/supervisor/conf.d/supervisor.conf

RUN apt-get install nano -y
RUN apt-get install supervisor -y

RUN touch /var/log/supervisord.log
# RUN unlink /tmp/supervisor.sock

CMD /usr/bin/supervisord -n 
