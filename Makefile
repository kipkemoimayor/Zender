deploy:
	rsync -e "ssh -i /home/collo/Desktop/Platinum/server/spectrum/Collins@24" -av ./ --exclude=node_modules --exclude=.git --exclude=logs  ubuntu@3.64.3.50:/var/www/html/test/easyphone/