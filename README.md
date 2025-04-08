<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Geofence Microservice

A geofencing microservice built with [NestJS](https://github.com/nestjs/nest) framework using TypeScript.

## Microservice Description

This microservice handles geographical boundary management and location-based event triggering (geofencing). It allows for the creation, management, and monitoring of virtual geographic boundaries, and generates events when tracked objects enter or exit these defined areas. It is designed to be scalable, maintainable, and easily deployable in a containerized environment.

### Key Features

- Dynamic geofence creation and management
- Real-time position tracking and boundary intersection detection
- Event generation for entry, exit, and dwell time within boundaries
- Support for various geofence shapes (circles, polygons, etc.)
- Spatial querying and filtering capabilities

### Service Dependencies

This microservice depends on the following services:

- Database: MongoDb

## Environment Variables

The following environment variables must be configured for the geofence microservice to function properly:

| Variable Name | Description | Required | Default Value | Example |
|---------------|-------------|----------|---------------|---------|
| PORT | Port on which the microservice will run | Yes | 3000 | 3001 |
| DB_URL| MongoDB Url | Yes | development | production |

## Project Setup

```bash
$ yarn install
```

## Compile and Run the Project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Communication Protocol

This microservice communicates using:

- REST API on `/api/*` endpoints
- Kafka message broker for asynchronous events
- TCP transport on port defined by `TRANSPORT_PORT` env variable
- Message patterns: "geofence.create", "geofence.update", "geofence.delete", "location.update", "geofence.event"

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /geofences | GET | Get all geofences (with filtering options) |
| /geofences/:id | GET | Get a specific geofence by ID |
| /geofences | POST | Create a new geofence |
| /geofences/:id | PUT | Update an existing geofence |
| /geofences/:id | DELETE | Delete a geofence |


## Run Tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [Discord Support Channel](https://discord.gg/G7Qnnhy)
- [NestJS Courses](https://courses.nestjs.com/)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to sponsors and support by amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).