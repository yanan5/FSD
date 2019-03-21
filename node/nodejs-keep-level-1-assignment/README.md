## Project Title (Keep Backend Application Level 1)
This is a simple node.js application with MongoDB access, can be used to implementation for CRUD operations with MongoDB

This expects the environment variable MONGO_URL, which you can set using below command 

On Linux platform
```
export MONGO_URL='mongodb://localhost:27017/testDB'
echo Testing - $MONGO_URL
```

On Windows platform
```
SET MONGO_URL='mongodb://localhost:27017/testDB'
echo Testing - %MONGO_URL%
```


### How to run this project

1. Install dependencies

```
npm install
```

or

```
yarn
```

2. Run application from terminal

```
npm start
```

3. Run test cases from terminal

```
npm run test
```

4. Run lint checks from terminal

```
npm run lint
```

