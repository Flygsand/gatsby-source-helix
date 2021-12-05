#!/bin/sh

wget --retry-connrefused --timeout=1 --waitretry=1 --tries=0 -qO- http://twitch-api:8080/units/clients | \
  jq -r '"TWITCH_CLIENT_ID=\(.data[0].ID)\nTWITCH_CLIENT_SECRET=\(.data[0].Secret)"' > .env
wget --retry-connrefused --timeout=1 --waitretry=1 --tries=0 -qO- http://twitch-api:8080/units/users | jq -r '"TWITCH_USER_ID=\(.data[0].id)"' >> .env

wget --retry-connrefused --timeout=1 --waitretry=1 --tries=0 -qO /dev/null http://site:8000/

exec npm test
