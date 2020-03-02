
rsync -av -e "ssh -i /mnt/d/ssh/key.pem" /mnt/d/dev/play-your-music/web/ ubuntu@18.218.60.38:/var/www/playyourmusic.org

rsync -av -e "ssh -i ~/.ssh/key.pem" /mnt/d/dev/play-your-music/web/ ubuntu@18.218.60.38:/var/www/playyourmusic.org  