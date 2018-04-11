FROM quanca/laravel

RUN apt-get install cron -y
RUN apt-get install nano -y

RUN touch /var/log/cron.log
COPY ./crontab /etc/cron.d/schedule-cron
RUN chmod 0644 /etc/cron.d/schedule-cron
RUN crontab /etc/cron.d/schedule-cron 

CMD cron -f && tail -f /var/log/cron.log