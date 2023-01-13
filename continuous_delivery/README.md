# Continuous delivery
This folder contains everything for the continuous delivery.  
## How does this work?
In my case, I do use Cloudflare CDN.  
1. Create API token here https://dash.cloudflare.com/profile/api-tokens  
2. Copy clftoken.txt to ~/clftoken.txt  
3. Edit the ~/clftoken.txt - insert your Cloudflare email and API token  
4. Run `bash get_id.sh`  
5. Copy the first ID from the output to the ~/clftoken.txt  
6. Add this to the `crontab -e`  
`*/1 * * * * cd /var/www/html/{{ path }}/continuous_delivery && bash cd.sh >> /root/1255.burgomaster.test.log 2>>&1`  
This will run the script every minute

## TL,DR:
1. git pull & purge CloudFlare cache