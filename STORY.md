# Story

```bash
$ npm install --save-dev sequelize-cli
$ npm install --save sequelize
$ npm install --save pg pg-hstore
$ npx sequelize-cli init
$ npx sequelize-cli --help
$ npx sequelize-cli db:migrate --help
$ npm i umzug
$ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
$ npx sequelize-cli seed:generate --name demo-user
```

```bash
$ npx sequelize-cli db:create

Sequelize CLI [Node: 12.19.0, CLI: 6.2.0, ORM: 6.3.5]

Loaded configuration file "config/config.json".
Using environment "development".

ERROR: role "root" does not exist

$ # Fixed username in config.json file to "karuppiahn"
$ $ npx sequelize-cli db:create

Sequelize CLI [Node: 12.19.0, CLI: 6.2.0, ORM: 6.3.5]

Loaded configuration file "config/config.json".
Using environment "development".
Database database_development created.
```

```bash
$ node server.js
/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/db.js:20
  storage: new SequelizeStorage({ sequelize }),
           ^

TypeError: SequelizeStorage is not a constructor
    at Object.<anonymous> (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/db.js:20:12)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Module.require (internal/modules/cjs/loader.js:903:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/server.js:4:19)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47
```

Getting rid of `SequelizeStorage` and the umzug library! :)

```bash
$ npx sequelize-cli db:migrate

Sequelize CLI [Node: 12.19.0, CLI: 6.2.0, ORM: 6.3.5]

Loaded configuration file "config/config.json".
Using environment "development".
== 20201212155800-create-user: migrating =======
== 20201212155800-create-user: migrated (0.025s)
```

```bash
$ node server.js
/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/db.js:16
modules.export = {
^

ReferenceError: modules is not defined
    at Object.<anonymous> (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/db.js:16:1)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Module.require (internal/modules/cjs/loader.js:903:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/server.js:4:19)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
```

It should be `module.exports` 😅

```bash
$ node server.js
/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/sequelize/lib/model.js:968
    if (this.sequelize.isDefined(this.name)) {
                       ^

TypeError: this.sequelize.isDefined is not a function
    at Function.init (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/sequelize/lib/model.js:968:24)
    at module.exports (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/models/user.js:16:8)
    at Object.<anonymous> (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/server.js:5:38)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47
```

https://duckduckgo.com/?q=this.sequelize.isDefined+is+not+a+function&t=ffab&ia=web&iax=qa

I passed the wrong parameter - it needed an instance of Sequelize, not the
Sequelize type itself, which can only be used to create instances using the
constructor

```bash
$ node server.js
Example app listening at http://localhost:8080
Unable to connect to the database: ConnectionError [SequelizeConnectionError]: connect ETIMEDOUT 93.184.216.34:5432
    at Client._connectionCallback (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:184:24)
    at Client._handleErrorWhileConnecting (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/pg/lib/client.js:305:19)
    at Client._handleErrorEvent (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/pg/lib/client.js:315:19)
    at Connection.emit (events.js:314:20)
    at Socket.reportStreamError (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/pg/lib/connection.js:53:12)
    at Socket.emit (events.js:314:20)
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:60:3)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  parent: Error: connect ETIMEDOUT 93.184.216.34:5432
      at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1145:16) {
    errno: 'ETIMEDOUT',
    code: 'ETIMEDOUT',
    syscall: 'connect',
    address: '93.184.216.34',
    port: 5432
  },
  original: Error: connect ETIMEDOUT 93.184.216.34:5432
      at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1145:16) {
    errno: 'ETIMEDOUT',
    code: 'ETIMEDOUT',
    syscall: 'connect',
    address: '93.184.216.34',
    port: 5432
  }
}
(node:50378) UnhandledPromiseRejectionWarning: SequelizeConnectionError: connect ETIMEDOUT 93.184.216.34:5432
    at Client._connectionCallback (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:184:24)
    at Client._handleErrorWhileConnecting (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/pg/lib/client.js:305:19)
    at Client._handleErrorEvent (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/pg/lib/client.js:315:19)
    at Connection.emit (events.js:314:20)
    at Socket.reportStreamError (/Users/karuppiahn/oss/github.com/karuppiah7890/nodejs-demo-app/node_modules/pg/lib/connection.js:53:12)
    at Socket.emit (events.js:314:20)
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:60:3)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
(node:50378) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:50378) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

```

```bash
$ npx sequelize-cli db:seed:all

Sequelize CLI [Node: 12.19.0, CLI: 6.2.0, ORM: 6.3.5]

Loaded configuration file "config/config.json".
Using environment "development".
== 20201212160053-demo-user: migrating =======
== 20201212160053-demo-user: migrated (0.007s)
```

```bash
$ node server.js
Example app listening at http://localhost:8080
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
Executing (default): SELECT "id", "firstName", "lastName", "email", "createdAt", "updatedAt" FROM "Users" AS "User";
Executing (default): SELECT "id", "firstName", "lastName", "email", "createdAt", "updatedAt" FROM "Users" AS "User";
Executing (default): SELECT "id", "firstName", "lastName", "email", "createdAt", "updatedAt" FROM "Users" AS "User";
Executing (default): SELECT "id", "firstName", "lastName", "email", "createdAt", "updatedAt" FROM "Users" AS "User";
```

```bash
$ curl localhost:8080 | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   307  100   307    0     0  18058      0 --:--:-- --:--:-- --:--:-- 18058
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@example.com",
    "createdAt": "2020-12-12T16:39:11.073Z",
    "updatedAt": "2020-12-12T16:39:11.073Z"
  },
  {
    "id": 2,
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@example.com",
    "createdAt": "2020-12-12T16:39:15.337Z",
    "updatedAt": "2020-12-12T16:39:15.337Z"
  }
]
```
