## Description

This is a small application build with the NodeJS-ExpressJS framework [NestJS](https://nestjs.com/), following a microservices architecture connecting three nodes. The flow should be as follows:

- The user can issue a POST request to the **checkout** app, which will create a new _order_ object in the database, and also
- Will send an event to the **billing** microservice, which will itself create a new _bill_ object in the database
- Will send an event to the **logistic** microservice, which will itself create a new _shipping_ object in the database

Thus, checkout could be considered the main node of the application, while billing and logistic could be considered the client nodes. However, in order to extent the features of the app, billing and logistic have been created as hybrid application, accepting also HTTP requests (in this case, just GET requests to retrieve the documents from the database)

Message brokering has been put in place using RabbitMQ service.

A local instance of MongoDB is also provided to persist the data.

### Requisites

You will need to have docker and docker-compose installed if you want to make it work like that.

If you wish to run it locally, you will need at least to have NodeJS installed, and probably the NestJS CLI.

### Running the app

Please notice that every node of the above depicted architecture is an independent NestJS application in itself, and could work on its own.

If you wish to ran the app locally, access every folder and perform the installation of the packages.

```bash
npm i --force
```

**The flag _--force_ should prevent some compatibility errors yield locally due to dependencies versions. Should this app go into production, this issues should be correctly addressed beforehand.**

After installation, you can run every app by

```bash
npm run start
```

**In order make it work correctly, you may need to start the client nodes in the order they connect to the messages queue**

Also, please note that since the application is ready to run using docker, you **will need to change the connection strings so they connect to localhost**.

### Recommended way of running the app

If you wish to just go ahead and run the whole thing, the app is containerized and ready for it.

Just run

```bash
docker-compose build

docker-compose up
```

After everything is done, the app will be ready to accept your requests in the following endpoints:

- (POST) /localhost:3000/orders
- (GET) /localhost:3000/orders
- (GET) /localhost:5000/bills
- (GET) /localhost:8000/shippings

This is an example of _order_ you can post:

```bash
{
  "clientId": 1,
  "direction": "Baker Street 221",
  "products": [
    {
      "id": 1,
      "quantity": 2,
      "cost": 10
    },
    {
      "id": 2,
      "quantity": 2,
      "cost": 15
    }
    ]
}
```

### Additional packages

Almost all the packages used in this application are the ones that NestJS provides out-of-the-box. However, in order to give it some of the extra features, it needs some other libraries:

- @nestjs/microservices: enables NestJS capabilities to build a microservices architecture
- @nestjs/mongoose: NestJS package to use mongoose middleware when using MongoDB as database.
- mongoose: the middleware package itself.
- @nestjs/swagger: NestJS package to access OpenAPI documentation features using Swagger.
- amqp-connection-manager && amqplib: to manage the connection with the RabbitMQ instance server.
- @nestjs/testing: NestJS module to manage testing features using mainly Jest and SuperJest testing libraries.

### Testing

Even if as a sample, since a much greater coverage would be needed for this application to be taken seriously, some example tests have been included in the _checkout_ (main node) repository.

You might run them by

```bash

npm run test
```

for the unit tests, and

```bash

npm run test:e2e
```

for the end to end tests.

### About the author

Trained as a biologist (yeah, sience!), I spent 6 years of my life building my own environmental start-up before becoming a developer by the end of 2019.
I currently torture and amuse myself working full-time as a backend developer, using mainly NodeJS and Typescript and frameworks as NestJS every now and then.

Feel free to reach me at [my email](mailto:adrian.h.m.sanz@gmail.com).
