#SET HOOKS
cp ./.github/hooks/pre-commit ./.git/hooks

#UP BACK-END
cd api/
docker-compose up

#UP FRONT-END
# cd web/
# yarn start