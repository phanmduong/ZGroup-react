FROM quanca/laravel
COPY ./sync.sh /home/sync.sh
RUN chmod +x /home/sync.sh

COPY ./id_rsa /root/.ssh/id_rsa
COPY ./id_rsa.pub /root/.ssh/id_rsa.pub

RUN chmod 400 /root/.ssh/id_rsa

RUN apt-get install git -y
RUN git config --global user.name "Quan"
RUN git config --global user.username "caoquan95"
RUN git config --global user.email "aquancva@gmail.com"
