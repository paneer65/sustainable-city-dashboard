# Sustainable City Dashboard
TCD Group 10 for Advanced Software Engineering

## Setup backend development environment
** Minimum python 3.5 required to install django version 2.2.6 **

### Installing Django

We are using django for our backend

First setup a python3 virtualenv and activate it. 

If you use ```venv```, follow as below to create a virtual environment.

```
python -m venv <Virtual Env Name>
source <Virtual Env Name>/bin/activate
```
If you use ```conda```, follow as below to create the virtual environment.
```
conda create -n <Virtual Env Name> python=3.5
conda activate <Virtual Env Name>
```


After that install the required packages using pip,
```
pip install -r requirements.txt
```

Check your django version
```
python3 -m django --version
```

### Installing Postgresql

Check the Postgresql website for instructions.

https://www.postgresql.org/

Create a new database with name Test and username and password as admin

### Installing Memcache

Memcache can be easily installed in linux and macOS but not so on Windows. Using WSL on windows is the best option

```
sudo apt-get install memcached
```

### Installing Redis

We use redis for our asynchronous tasks in Celery

```
sudo apt-get install redis-server
```

### Install Flower for Celery (Optional)

To monitor celery jobs we use flower
```
pip install flower
cd backend
celery flower -A backend --port=5555
```

## Start server

First start all the services required

```
# Run both on separate terminals or add '&' to make them run in the background
memcached
redis-server
```

Now with our current working directory as sustainable-city-management, to start the server

First start celery

```
cd backend
celery worker -A backend --loglevel=info
```

Also run celery beat

```
cd backend
celery -A backend beat --loglevel=info
```

Then start the django development server

```
cd backend
python3 manage.py runserver
```

You may want to load data to show in reports. To load fixtures

```
python3 manage.py loaddata backend/fixtures/bikes_fixtures.json
python3 manage.py loaddata backend/fixtures/event_fixtures.json
python3 manage.py loaddata backend/fixtures/news_fixtures.json
python3 manage.py loaddata backend/fixtures/pollution_fixtures.json
```

Then navigate to http://127.0.0.1:8000/ and you should see that your app is running.
Note this is the interface for the django admin. The actual user interface is given below

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
run the below two code snipppets, which would install all the required packages for frontend,
```
yarn install
```
```
npm install
```

run
```
yarn start or npm start
```

Then navigate to http://localhost:3000/ and you should see that your app is running

## Setting up the Database
We are using PostgreSQL version 12 as our DBMS

Download and install [PostgreSQL](https://www.postgresql.org/download/)

Install [psycopg2](http://initd.org/psycopg/docs/install.html) >=2.8 using,

```
pip install psycopg2-binary
```
