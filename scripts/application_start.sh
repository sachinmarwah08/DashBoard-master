#!/bin/bash

#give permission for everything in the roundglass-app directory
sudo chmod -R 777 /home/ec2-user/roundglass-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/roundglass-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install

#start our node app
#sudo nohup npm start  >> /var/log/dashboard.out &
#screen -d -m npm start >> /var/log/dashboard.out
pm2 start --name roundglass_dashboard npm -- start --watch
pm2 save
