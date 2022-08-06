# suburban-outfitters


# Running the Application
The client web app, php server side api and mysql database are all packaged as a set of docker containers. Docker is the only dependency required to view this submission.

1. Clone this repo

```bash
git clone https://github.com/jspenc72/suburban-outfitters.git
```
2. cd to root of git repository

```bash
cd suburban-outfitters
```

3. start db, api and front end application using docker

```bash
docker-compose up
```

# Angular Client Development

Install dependencies

```bash
npm i
```

Start development server

```bash
ng serve
```

# Angular Client Deployment

```bash
ng build --extractCss=true --optimization=false
```
## Compile App for Deployment to github pages.

```bash
ng build --prod --base-href "suburban-outfitters"

```

## Build and run angular app as Docker Container

```bash
docker build -t suburban-outfitters .
```

```bash
docker run suburban-outfitters -p 4200:4200 
```

# Laravel API Development

1. Start a mysql database
2. Run database migrations and see to create populate database with test data

```bash
php artisan migrate:refresh
php artisan migrate:refresh --seed #Seed db and migrate in a single step
```

```bash
composer dump-autoload
php artisan cache:clear
php artisan optimize
php artisan db:seed
```

3. Run the developement server

```bash
composer install
```

```bash
php artisan serve
```

# Dependencies

- https://www.docker.com
- https://cli.angular.io
- https://laravel.com
- mysql workbench