source ~/clftoken.txt
purgecache_command=$(cat << EOF
curl --request POST
  --url https://api.cloudflare.com/client/v4/zones/$identifier/purge_cache
  --header 'Content-Type: application/json'
  --header 'X-Auth-Email: $email'
  --header 'X-Auth-Key: $clftoken'
  --data '{ "purge_everything": true }'
EOF
)
eval $purgecache_command