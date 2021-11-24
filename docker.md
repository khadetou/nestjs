### CREATE A NEW  POSTGRES DOCKER IMAGE

`docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD= password -d postgres`

### CHECK IF THE IMAGE HAS BEEN CREATED

`docker container ls`

### STOP A CONTAINER

`docker container stop postgres-nest`

### DELETE A CONTAINER

`docker conatainer rm postgres-nest`


### postgres-nest is the name of our image created on the top



### Dowload a list of images from docker.yaml
`docker-compose up -d`
