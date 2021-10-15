# Run all docker containers specified in docker-compose.yaml file.
up:
	@docker-compose up -d

# Stop all the running containers.
stop:
	@docker-compose stop

# Run bash shell inside backend container.
shell:
	@docker-compose exec twitter-clone-backend bash

# Show logs inside backend container.
logs:
	@docker-compose logs --follow --timestamps --tail 1000 twitter-clone-backend

# Run all docker containers and connect to the backend application logs.
dev: up logs
