source ~/clftoken.txt
#after that we expected to get this variables in the env
# clftoken, email
get_id=$(cat << EOF
curl --request GET \
  --url https://api.cloudflare.com/client/v4/zones \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: $email' \
  --header 'X-Auth-Key: $clftoken'
EOF
)
eval $get_id
