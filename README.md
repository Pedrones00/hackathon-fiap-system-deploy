# Instructions to run the projects with Docker Compose

This repository orchestrates several hackathon services. Follow the steps below to clone the projects, prepare environment files, and run them with `docker-compose` (or `podman-compose` as an alternative).

Steps

1) Create a workspace and clone the repositories

```bash
git clone https://github.com/Pedrones00/hackathon-fiap-system-deploy.git
git clone https://github.com/Pedrones00/hackathon-fiap-account-entry-service.git
git clone https://github.com/Pedrones00/hackathon-fiap-entry-rule-classifier.git
git clone https://github.com/Pedrones00/hackathon-fiap-budget-service.git
git clone https://github.com/Pedrones00/hackathon-fiap-ai-insight-service.git
```

2) Adjust environment variables

The Docker Compose configuration already defines environment variables for each service. If changes are necessary, update the service environment entries in the compose file, and ensure values remain consistent across services and with any external dependencies.

3) Run Docker Compose

From the `hackathon-fiap-system-deploy` directory (where `docker-compose.yml` is located), run:

```bash
cd hackathon-fiap-system-deploy
podman-compose up --build --force-recreate -d
```

4) Generate sample data (seed)

A helper script (`seed.js` in this repo) can populate the services with example rules and account entries. With Node.js installed, execute the seed file from the `system-deploy` directory once the containers are running:

```bash
node seed.js
```

The script will POST sample rules to port `3002` and entries to port `3001`, printing status messages as it runs.


Verification and logs

Check running containers:

```bash
podman ps
```

To view logs for a specific service:

```bash
podman-compose logs -f <service_name>
```

4) Stop and remove containers

```bash
podman-compose down
```

Final notes
- Make sure any required ports are not in use.
