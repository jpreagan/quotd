# The Quotd API

Quotd is a public API serving quotes and aphorisms to inspire and uplift humanity.

## Getting started

To get started, you may receive a random quote with:

```bash
curl https://api.quotd.io/quotes/random
```

Or a specific quote:

```bash
curl https://api.quotd.io/quotes/1
```

You may also access:

- all quotes (`/quotes`)
- a list of categories (`/categories`)
- a list of authors (`/authors`)
- all quotes from a specific author (`/authors/1`).

Check out the [documentation](https://api.quotd.io/) for more information.

## Development

### Installation

```bash
npm install
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
