# Social Media API

## 🚀 Setup and Run the Project

Follow these steps to set up and run this Node.js + MySQL project on your local machine.

## 🔹 Prerequisites

Before you start, make sure you have installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) 

## 🔹 Clone the Repository

Run the following command:

```sh
git clone https://github.com/alexPalladis/social-media-API.git
cd social-media-API
```

## 🔹 Install dependencies

Then run:

```sh
npm install
```

## 🔹 Set Up MySQL Database

###  Using a Local MySQL Installation

Follow these steps:

Open MySQL:

```sh
mysql -u root -p
```

Create a database:

```sql
CREATE DATABASE social_media;
```

## 🔹 Create a .env File

Create a new file `.env` in the root directory and add:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=social_media
DB_PORT=3306
JWT_SECRET=your_jsonwebtoken_secret
```

## 🔹 Start the server

```sh
npm start
```
If everything is set up correctly, you should see:

```sh
Connected to DB and Server listening on port 5000...
```

## 🔹 API endpoints


- **POST /api/users/signup** - Creates a new user.
- **POST /api/users/login** - Logs in the user.
- **POST /api/posts** - Creates a new post. (ptotected route)
- **PUT /api/posts/:id** - Updates a post by ID. (ptotected route)
- **DELETE /api/posts/:id** - Deletes a post by ID. (ptotected route)
- **GET /api/posts/my-posts** - Retrieves all the posts of the logged in user. (ptotected route)
- **GET /api/posts/user/:userId** - Retrieves the posts of specific user.
- **GET /api/posts** - Retrieves all the existing posts in chronological order.
- **POST /api/comments/:postId** - Creates a comment by post Id. (ptotected route)
- **PUT /api/comments/:id** - Updates a comment by Id. (ptotected route)
- **DELETE /api/comments/:id** - Deletes a comment by Id. (ptotected route)
- **GET /api/comments/post/:postId** - Retrieves all the comments of a post by its Id.

