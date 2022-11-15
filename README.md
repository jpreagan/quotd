# The Quotd API

Quotd is a public API serving quotes and aphorisms to inspire and uplift humanity.

## Getting started

You may receive a random quote with:

```bash
curl https://api.quotd.io/quotes/random
```

Or a specific quote:

```bash
curl https://api.quotd.io/quotes/1
```

Also check out:

- all quotes (`/quotes`)
- a list of categories (`/categories`)
- a list of authors (`/authors`)
- all quotes from a specific author (`/authors/1`).

See the [documentation](https://api.quotd.io/) for more information.

## Development

### Installation

```bash
npm install
```

### Configuration

```bash
# Copy sample .env file. You may need to edit the values.
cp .env.dist .env
```

### Set up the database

```bash
# Start the supporting services in background
npm run db:up

# Setup the database
npx prisma db push

# Seed the database (optional)
npx prisma db seed
```

### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## License

Quotd is [MIT licensed](LICENSE).
