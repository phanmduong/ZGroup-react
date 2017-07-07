#!/bin/bash
 
# Invoke the Forever module (to START our Node.js server).
sudo ./node_modules/forever/bin/forever \
start \
-al forever.log \
-ao out.log \
-ae err.log \
socket-http.js
