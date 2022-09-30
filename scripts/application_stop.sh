#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
#sudo pkill node
pm2 stop roundglass_dashboard
