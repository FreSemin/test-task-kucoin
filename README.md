# TEST TASK KUCOIN

NestJS project implemented to get data from [KUCOIN API](https://www.kucoin.com/docs/websocket/spot-trading/public-channels/all-tickers), store it and provide access to the data by api. Task was implemented using NestJS, Prisma, PostgreSQL.

Project consists from two services:

- `api-gateway` - Provides endpoints for get stored data;
- `tickers-service` - Service implemented for get data from 'api' and then store that to database, using 'cron job';

## Installation

1. Create `.env` file in the root of the project;
2. Copy content from `example.env` in newly created `.env` and replace all `<your_value>` with your values;
3. Copy `.env` file to `api-gateway` and to `tickers-service` folders;
4. On this stage your should have three `.env` files with your values;
5. From the root of the project run command:

```
   docker-compose up
```

6. Check that database was initialized by connected to it using credentials from `.env`;
7. Navigate to `tickers-service` folder and then install dependencies:

```
npm install
```

8. From the `ticker-service` folder run Prisma migrations:

```
npx prisma migrate deploy
```

9. Check that tables was initialized in your database;
10. Run `ticker-service` in dev or production mode:

```
npm run start:dev

or

npm run build
npm run start:prod
```

Expected result: logs in console after one minute:

```
Cron Job: sync_tickers started: Mon, 19 Feb 2024 03:16:00 GMT
Cron Job: sync_tickers finished: Mon, 19 Feb 2024 03:16:02 GMT
```

11. Navigate to `api-gateway` folder and then install dependencies:

```
npm install
```

12. In `api-gateway` folder run next command to generate Prisma client:

```
npx prisma generate
```

13. Run `api-gateway` in dev or production mode:

```
npm run start:dev

or

npm run build
npm run start:prod
```

14. (Optional) Import collections and environment to your local PostMan from `postman` folder;

### API-GATEWAY

Root path of the APP API url is: `http://localhost:<your_env_port>/api/v1`.

Available endpoints:

- Users:

  - `POST` create user `/user`:
    - Expected JSON body:
      ```
      {
        "name": "name1",
        "email": "name1@email.com",
        "password": "87654321",
        "retypedPassword": "87654321"
      }
      ```
    - Expected Response:
      ```
      {
        "id": 1,
        "name": "name1",
        "email": "name1@email.com"
      }
      ```

- Auth:

  - `POST` user sing in `/auth/signin`
    - Expected JSON body:
      ```
      {
        "email": "name1@email.com",
        "password": "87654321"
      }
      ```
    - Expected Response:
      ```
      {
        "access_token": "<generated_token>"
      }
      ```

- Symbol (token required):
- **Warning!** `symbolOrSymbolId` can be `id` of the symbol in `symbol` database table or symbol (example: `FLAME-USDT` or `13`)

  - `GET` all symbols `/symbol/all`
  - `GET` one symbol `/symbol/:symbolOrSymbolId`

- Ticker (token required):
- **Warning!** `symbolOrSymbolId` can be `id` of the symbol in `symbol` database table or symbol (example: `FLAME-USDT` or `13`)
  - `GET` all Tickers current data `/ticker/all`
  - `GET` one Ticker current data `/ticker/:symbolOrSymbolId`
  - `GET` history of the Ticker for period `/ticker/history/:symbolOrSymbolId?from=YYYY-MM-DDTHH:mm&to=YYYY-MM-DDTHH:mm`
    - Example: `/ticker/history/SENSO-USDT?from=2024-02-19T06:13&to=2024-02-19T06:26`
    - Example: `/ticker/history/33?from=2024-02-19T06:13&to=2024-02-19T06:26`
    - `to=YYYY-MM-DDTHH:mm` is optional;

### TICKERS-SERVICE

Service creates 'cron job' which gets data from 'KUCOIN' api and store in to database by `CRON_SYNC_TICKERS_TIME` period.
