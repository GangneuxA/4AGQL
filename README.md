# GraphQL-project

The class project is realized by Alexis GANGNEUX and Julien BOISGARD.

We have 3 databases model follow this MLD:
![Alt text](/images/archi.png "follow this model")

each models has his pod

In docker, we have this architecture
![Alt text](/images/pods.png "follow this model")

## Lauch this project

### Lauch the back

in terminal to launch the back use this command :

```Bash
docker-compose up

```

this command will create the correctly images and lunch all pods

The API graphql is ready:

for the users on http://localhost:4000
for the grades on http://localhost:4002
for the classrooms on http://localhost:4001

### Lauch the front

in folder front create .env and insert theses lines :

```Bash
REACT_APP_URLUSER="http://localhost:4000/"
REACT_APP_URLGRADE="http://localhost:4002/"
REACT_APP_URLCLASSROOM="http://localhost:4001/"
```

in another terminal
For launch the front use this commands :

```Bash
cd front
npm install
npm start

```

The front in react is ready on http://localhost:3000

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

### Security

For the security the Appollo servers have CORS to accept only request on local ok react app.

All mutation in apollo server have JWT token with x-access-token and x-refresh-token to generate this you need to connect with graphql user with mutation login. before you register with mutation createuser in user apollo server.

### Role

In student you are acces to view grade , classroom, users and you can edit/delete your user.
In teacher you can crud grade , classroom and users.

to becom teacher user mutation setteacher by being connected then reconnect 
