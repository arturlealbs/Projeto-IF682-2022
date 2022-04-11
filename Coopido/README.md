# Projeto-IF682
Boilerplate for Software Engineering Project in the IF682 class.

## How to run this project


## Using Docker 

If you want to run the developer version of this project, where you can modify the files and triggers a live reload, you can use the following command:
```bash
docker-compose build
docker-compose up -d
```

But, if you want to run the production version of this project, where the project will be builded, receiving more performance, you can use the following command:
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

> Don't forget to remove the previous container if you want to switch between the versions, to see the containers, run `docker container ls -a`, and to remove it `docker container prune` or just `docker-compose down` using the previous version.