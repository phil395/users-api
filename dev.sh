sudo docker run -d \
	--name some-postgres \
  --rm \
	-e POSTGRES_PASSWORD=qwerty \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v $PWD/database:/var/lib/postgresql/data \
  -p 5432:5432 \
	postgres