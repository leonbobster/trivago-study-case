# trivago-study-case

## Description

You don't need any button to analyze text, app do it on the fly. You can add reviews with the form or with the csv file upload. The review analyzer is not a real-life application ;-). It concatenates adjactives, which are stored in the file as a JS array, with topics and then pass them to **Aho-Corasick** module. More information about algorithm: https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm .


The challenge has been implemented using:

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

4. You can stop application with command:

```
yarn dev:down
```

## Uninstall

```
yarn dev:uninstall
```
