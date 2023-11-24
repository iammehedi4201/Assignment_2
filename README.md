#### project setup step

## prerequisites

- Node.js
- npm
- MongoDb

## Installation

1. Clone the respository :

```ts
git clone https://github.com/iammehedi4201/Assignment_2.git

```

2. Navigate into the directory

```ts

cd your-repo

```

3. Install the Dependecies :

```ts

npm install

```

4. configuration

. Create a `.env` file in the root directory of the project
. Add the following environment variables to the `.env` file

```ts

NODE_ENV= development
PORT= 3001
DATABASE_URL= your mongodb url
BCRYPT_SALT_ROUND= your bcrypt slat round like 0 to 10

```

5. Run the Application

```ts

npm run start:dev

```

6. Access the Application

your appplication should now be running.Access it a web browser using

```ts
http://localhost: your server port number like 3001

```

7. Api Endpoints

. GET /api/users : fetch all users
. GET /api/users/:userId : fetch a specific user
. POST /api/users : Create new user
. DELETE /api/users/:userId : delete a specific user
. PUT /api/users/:userId : update a specific user
. GET /api/users/:userId/orders : fetch user orders
. PUT /api/users/:userId/orders : Add new orders to users
. Get /api/users/:userId/orders/total-price : calculate total of orders for a specific users
