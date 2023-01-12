git_pull_result=$(git pull)
source ~/clftoken.txt
#after that we expected to get this variables in the env
# identifier, clftoken, email
expected_res="Already up-to-date."
purgecache_command=$(cat << EOF
curl --request POST
  --url https://api.cloudflare.com/client/v4/zones/$identifier/purge_cache
  --header 'Content-Type: application/json'
  --header 'X-Auth-Email: $email'
  --header 'X-Auth-Key: $clftoken'
  --data '{ "purge_everything": true }'
EOF
)
if [[ $git_pull_result != $expected_res ]]
then
  eval $purgecache_command
fi
