# Setup Project

Create .env file

```
DATABASE_URL="postgresql://postgres:54321@localhost:5432/learn_ts_api?schema=public"
```

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
