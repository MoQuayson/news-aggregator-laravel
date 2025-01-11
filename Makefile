
start-api:
	cd src/api && php artisan serve --port=8010

docker-build:
	cd src && docker-compose down
	cd src && docker-compose up -d --build

docker-run-deps:
	docker exec -it news-aggregator-api composer install
	docker exec -it news-aggregator-api chmod -R 775 storage bootstrap/cache
	docker exec -it news-aggregator-api php artisan migrate

docker-run-all: docker-build docker-run-deps