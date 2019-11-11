# Sustainable City Dashboard
TCD Group 10 for Advanced Software Engineering

## Setup backend development environment
** Minimum python 3.5 required to install django version 2.2.6 **

We are using django for our backend

First setup a python3 virtualenv and activate it. After that install using pip
```
pip install django==2.2.6
```

Check your django version
```
python3 -m django --version
```
## Start server

Now with our current working directory as sustainable-city-management, to start the server
```
cd backend
python3 manage.py runserver
```

Then navigate to http://127.0.0.1:8000/ and you should see that your app is running

## Setting up the frontend development environment

You’ll need to have Node >= 8.10 and npm >= 5.6 on your machine
Refer https://nodejs.org/en/ for setting up node and npm

Check your node version using
```
node -v
```
It should be >=8.10

check your npm version using
```
npm -v
```
It should be >=5.6

After that run
```
cd frontend
```
run
```
yarn install
```

run
```
yarn start
```

Then navigate to http://localhost:3000/ and you should see that your app is running

## Setting up the Database
We are using PostgreSQL version 12 as our DBMS


