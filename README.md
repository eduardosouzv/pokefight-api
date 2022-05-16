<p align="center">
  <img src="./src/assets/pokefight-api-md.png" />
</p>

<p align="center">Create many battles between pokemons and get them in webhook after be processed in our queue.</p>

- [Setting up Webhook config](#setting-up-webhook-config)
- [Running with docker-compose](#running-with-docker-compose)

## Setting up Webhook config

First, you will need a webhook url, I recommend using [Webhook.site](https://webhook.site/). Copy _Your unique URL_ and paste into `docker-compose.yml` in environment variable `WEBHOOK_LINK`.

## Running with docker-compose

Just run:

```bash
$ docker-compose up -d
```

To stop it:

```bash
$ docker-compose down
```

After run compose, you can acess:

- Swagger container, containing the API routes references, running on port 7777 ([localhost:7777](http://localhost:3333/));
- Pokefight API running on port `3333` ([localhost:3333](http://localhost:3333/));
- Bull Board, to see the current status of battle queues ([localhost:3333/admin/queues](http://localhost:3333/admin/queues));
