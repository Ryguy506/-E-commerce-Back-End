# E-commerce-Back-End

## Description
This project is a back end for an e-commerce site. It uses Express.js API and Sequelize to interact with a MySQL database.


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)


## Installation
Clone the repo to your local machine.

Have node.js installed

To install necessary dependencies, run the following command:

```
npm i
```

## Usage
insert the schema.sql code in the db folder into your mysql workbench and run it to create the database.

Fill out the .env.EXAMPLE file with your mysql credentials and rename the file to .env

then run the following command on root to seed the database with data:

```
node seeds/index.js
```
then run the following command to start the server:        

```
node server.js
```

then use insomnia or postman to test the routes.

### Demo

[![demo](https://i.ytimg.com/vi/9-1xyGos0-4/maxresdefault.jpg)](https://youtu.be/9-1xyGos0-4 "demo")

## License
This project is licensed under the MIT license.
