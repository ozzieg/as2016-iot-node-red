#!/bin/bash

MONGODB_URL=$MONGOLAB_URI
POSTGRESDB_URL=$DATABASE_URL

part1=${MONGODB_URL#mongodb://}
MONGODB_URL=${part1%:*}
echo $MONGODB_URL

part1=${MONGOLAB_URI#mongodb:*:*:}
MONGODB_PORT=${part1%/*}
MONGODB_DATABASE=${part1#*/}
echo $MONGODB_PORT
echo $MONGODB_DATABASE

part1=${DATABASE_URL#postgres://*@}
POSTGRESDB_URL=${part1%:*}
echo $POSTGRESDB_URL

part1=${DATABASE_URL#postgres:*:*:}
POSTGRESDB_DATABASE=${part1#*/}
echo $POSTGRESDB_DATABASE

part1=${DATABASE_URL#postgres://*}
part2=${part1%@*}
POSTGRESDB_USERNAME=${part2%:*}
POSTGRESDB_PASSWORD=${part2#*:}
echo $POSTGRESDB_USERNAME $POSTGRESDB_PASSWORD

#modify flow_creds.json and write the postgresdb username and password
sed -i -e 's/postgresdb_user/'$POSTGRESDB_USERNAME'/g' defaults/flow_creds.json
sed -i -e 's/postgresdb_password/'$POSTGRESDB_PASSWORD'/g' defaults/flow_creds.json

#modify flow_creds.json and write particle access token
sed -i -e 's/PARTICLE_ACCESS_TOKEN/'$PARTICLE_ACCESS_TOKEN'/g' defaults/flow_creds.json

export MONGODB_PORT MONGODB_DATABASE MONGODB_URL POSTGRESDB_URL POSTGRESDB_DATABASE