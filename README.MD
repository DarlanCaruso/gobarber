# App GoBarber

Clone this repository and run

```
yarn install
```

If you want, you can run the Postgres database with this Docker command below

```
docker run --name database -p 5432:5432 -d -t kartoza/postgis
```

Run command below to run migrations to database

```
npx sequelize db:migrate
```
