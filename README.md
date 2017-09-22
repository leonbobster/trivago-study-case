# trivago-study-case

## Description

The challenge has been implementing using:

Server:
- Node.js
- Es6(Babel)
- Express
- GraphQl
- Sqlite3
  
Client:
- React
- React-Apollo (GraphQl client)
- React-Bootstrap
  
Testing:  
- Jest

For searching multiple substring in a text used **Aho-Corasick** JavaScript algorithm implementation.
https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm


## Installation

You should have docker and yarn (or npm) package manager installed (all futher instructions will be for yarn).

1. Clone this repo:
```
git clone git@github.com:leonbobster/trivago-study-case.git
```

2. Run install script to build docker images:
```
cd trivago-study-case
yarn dev:install
```

3. Ensure that you have free port 80 on your local machine. 
Otherwise you shoud change the port in nginx configuration 
https://github.com/leonbobster/trivago-study-case/blob/master/config/nginx/nginx.dev.conf#L37
Now you can run application, the script will install all dependencies and run development servers:
```
yarn dev:up
```

You should see in the console:

```
trivago-api | App listening on port 8080!
trivago-api | Connected to Trivago dababase.
...
trivago-app | You can now view app in the browser.
trivago-app | 
trivago-app |   Local:            http://localhost:3000/
trivago-app |   On Your Network:  http://172.18.0.2:3000/
```

At this point everything is ready and you can navigate "http://localhost" in your browser.
