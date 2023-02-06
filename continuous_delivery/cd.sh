git_pull_result=$(git pull)
source ~/clftoken.txt
#after that we expected to get this variables in the env
# identifier, clftoken, email
# sentry_acc_id, sentry_proj_id
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

commit_cmd(){
 git log --stat -n 1 | head -1
}
commit=$(commit_cmd)
branch_cmd(){
 git status | head -1
}
branch=$(branch_cmd)
release=$branch" "$commit

sentry_release_upd=$(cat << EOF
curl --request POST
  --url https://sentry.io/api/hooks/release/builtin/$sentry_acc_id/$sentry_proj_id/
  --header 'Content-Type: application/json'
  --data '{"version": "$release"}'
EOF
)

if [[ $git_pull_result != $expected_res ]]
then
  eval $purgecache_command
  eval $sentry_release_upd
fi
