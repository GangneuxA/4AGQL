# GraphQL-project

The class project is realized by Alexis GANGNEUX and Julien BOISGARD.

We have 3 databases model follow this MLD:
![Alt text](/images/archi.png "follow this model")
each models has his pod

In docker, we have this architecture
![Alt text](/images/pods.png "follow this model")

## Lauch this project

For launch use this command :

```Bash
docker-compose up

```

this command will create the correctly images and lunch all pods

The API graphql is ready:

for the users on http://localhost:4000
for the grades on http://localhost:4002
for the classrooms on http://localhost:4001

The front in react is ready on http://localhost:3000

## Recreate an image

```Bash
docker-compose build "nameOfimage"
```

## Docs

### docs API's

All querys and mutations is available on appollo serveur

launch this command for launch the project with exposed port to display the docs

```Bash
docker-compose up

```

once launched each API have one docs on the links:
user: http://localhost:4000
grades: http://localhost:4002
classrooms: http://localhost:4001

### Tests

All tests of querys and mutations is available

launch this command for launch the project with exposed port to display the docs

```Bash
docker-compose up

```

in the folder back/grades , back/users or back/classroom launch

```Bash
npm test

```
