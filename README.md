# EVENT TRACKING

Event Tracking is a project which have frontend built in react and backend built in node-express. This project uses sql database with the use of `bookshelf` ORM.

This project consist of two modules Admin and User. 

## Installation

Clone this repository by running below command in terminal
- `git clone https://gitlab.com/rohitsamal.mvteams/frontend.git`

then go to frontend directory
- `cd event-tracking/frontend`

- run `npm i` or `npm install`. It will install all dependencies.

- now move out of the directory and go to the backend directory

- `cd ../backend`

- run `npm i` or `npm install`

## Now create your database by going to 'localhost/phpmyadmin'.

- Create database named events.

- Create tables :- category, event, subcategory, subevents, userevents, users.

## Database Structure

### category table

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| name | varchar(255) | 

### subcategory table

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| category_id |  int | 
| name | varchar(255) |

PRIMARY KEY : id

FOREIGN KEY : category_id   REFERENCES category table

RELATION with category table (many-to-one)


### event table

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| category_id | int |
| title | mediumtext | 
| description | mediumtext | 
| image | varchar(255) |
| start_date | datetime |
|end_date | datetime |

PRIMARY KEY : id

FOREIGN KEY : category_id  REFERENCES category table

RELATION with category table (many-to-one)


### subevents table

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| event_id | int |
| subcategory_id | int |

PRIMARY KEY : id

FOREIGN KEY : event_id REFERENCES event table, subcategory_id REFERENCES 
subcategory table

RELATION with event and subcategory table (many-to-one)

### users table

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| name | varchar(50) |
| email | varchar(50) |
| contact | varchar(50) |

PRIMARY KEY : id


### userevents table

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| user_id | int |
|event_id | int |

PRIMARY KEY : id

FOREIGN KEY : user_id REFERENCES user table, event_id REFERENCES event table

RELATION with user and event table (many-to-one)

## Now connect your database to your application using bookshelf configuration.

```
const knex = require("knex")({
  debug: true,
  client: "mysql",
  connection: {
    host: "localhost",
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "events",
  },
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
```
- Now application is ready to run

- Go to the backend folder in terminal and run `DEBUG=backend:* npm start`. It will start your backend server at `http://localhost:3001/`.

- Then go to frontend folder and run `npm start`. It will run your web application on server `http://localhost:3000/`.

- Now applicationis ready to use.

# Database Model

  - Model are used to run CRUD operations on database tables.

  - category.js
  ```
    const bookshelf = require('./dbconfig');
    const SubCategory = require('./subCategory');
    const Event = require('./event')

    const Category = bookshelf.model("Category",{
        tableName : "category",
        subcategory() {
            return this.hasMany(SubCategory);
        },
        event() {
            return this.hasMany(Event);
        }
    })

    module.exports = Category;
  ```

  - Category is a model for the category table. In which I have define the relation with another table to perform relation queries.

  - tableName is the name of table whose model is created.

  - functions define relations between different tables.

  - [event.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/model/event.js)

  - [subCategory.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/model/subCategory.js)

  - [subevent.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/model/subevent.js)

  - [user.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/model/user.js)

  - [userevents.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/model/userevents.js)

# Routes

  - I have defined all routes for the api's in the backend/routes folder.

  - I have used express router to define routes and call them in app.js in backend folder.

  - [category.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/category.js)

  - [event.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/event.js)

  - [subCategory.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/subCategory.js)

  - [subevent.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/subevent.js)

  - [user.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/user.js)

  -[userevents.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/userevents.js)


# Modules

## Admin Module

  - This module consits three sub-module
    - Add category
    - Add Sub-Category
    - Add Events

  ### ADD Category 
  - In this module admin can add categories in database.

  - It adds the category data in databse by using api "http://localhost:3001/category/add".

  - This module contain function addCategory() which send the request to the node server.
  ```
    const addCategory = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/category/add", category)
      .then((response) => {
        setCategory({ ...category, name: "" });
        alert("category has been added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Category with same name existed");
        setCategory({ ...category, name: "" });
      });
    };
  ```

  - This module use "/category/add" route for request and response. 
  
  ```
    router.post("/add", async (req, res) => {
      try {
        await new Category(req.body)
          .save()
          .then((category) => {
            res.send(category);
          })
          .catch((err) => {
            res.status(400).send("Category existed");
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    });
  ```

  ### ADD SubCategory

  - This module contains SelectField for selction of categories from dropdown and TextFields for subcategory.

  - This module fetch all categories from database using api "http://localhost:3001/category". and store the data in menu option of select field.

```
const getCategory = (callback) => {
        axios.get("http://localhost:3001/category").then((response) => {
          console.log(response.data);
          callback(response.data);
        }).catch(err => {
          console.log(err)
        });
}
```

  - "/category" 

```
router.get("/", async (req, res) => {
  try {
    await new Category()
      .fetchAll()
      .then((category) => {
        if (category.length === 0) {
          res.send("Category not found");
        } else {
          res.send(category.toJSON());
        }
      })
      .catch((err) => {
        res.status(404);
        console.log("Database module error", err);
      });
  } catch (err) {
    console.log("Error caught by try catch : ", err);
  }
});

```

  - This module add category using function "addSubCategory" which uses api "http://localhost:3001/subcategory/add".

```
  const addSubCategory = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/subcategory/add", subCategory)
      .then((res) => {
        alert("Sub-Category has been added succesfully");
        setCategoryName("");
        setSubCategory({ ...subCategory, name: "" });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
```
















