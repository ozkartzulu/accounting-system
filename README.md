
# Accounting System Company Transport

This project was developed for manager a Transport Company, the incomes, the expenses, register of partners, register of operators, generate reports.

The primary goal of this project is to expedite the process of registering income and expenses of all partners.

The tools used for develop:
- Remix for Frond end and Back end.
- MongoDB for Database.
- Tailwind CSS for styles.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Deployment](#deployment)

## Requirements

The project was developed with
* node `^18.12.0`
* npm `^8.19.2`

## Installation

For the install on local environment, clone the repository

```bash
$ git clone https://github.com/ozkartzulu/accounting-system.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use `npm install` will suffice.

```bash
$ npm install  # Install project dependencies
```

## Deployment

This project uses the mongoDB database, for it to work it must be installed, then the daemon service will start it.

Must be create the file .env, inside save the variables 'SERVER_URL' and 'DB_NAME'

```bash
SERVER_URL="mongodb://127.0.0.1:27017" 
DB_NAME="name-database"
```

For view a demo, the project was [deployed in platform versel](https://accounting-system-blond.vercel.app/)

You can create a new user or you can use username: test and password: test

