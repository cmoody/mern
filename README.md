# MERN Demo App

This is a sample application using Mongodb for the database, express for API endpoints and React for a front end application.

## Installation

The server and front-end applications are separated so installtion needs to occur in both the server and www folders.  The only external dependency is to setup and run a mongodb instance.

[Mongodb installation instructions](https://docs.mongodb.com/manual/administration/install-community/ "Mongo Installtion")

```
cd server && npm install
```

```
cd www && npm install
```


## Running the App

The API uses nodemon to allow live reloading when editing the REST endpoints.  Ir ia installed locally so there is no need for global installation.

1. Start mongo database
```
mongod
```

2. Start API - development
```
cd server && npm run start:dev
```

3. Start web app
```
cd www && npm run start
```