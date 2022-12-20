# EVENT TRACKING

Event Tracking is a project which have frontend built in react and backend built in node-express. This project uses sql database with the use of `bookshelf` ORM.

This project consist of two modules Admin and User. 

## Installation

Clone this repository by running below command in terminal
```terminal
$ git clone https://gitlab.com/rohitsamal.mvteams/frontend.git
```

then go to frontend directory
```terminal
$ cd event-tracking/frontend
```
- run `npm i` or `npm install`. It will install all dependencies.

- now move out of the directory and go to the backend directory

```terminal
$ cd ../backend
```

- run `npm i` or `npm install`

## Now create your database by going to 'localhost/phpmyadmin'.

- Create database named events.

## Knex Migration

- Create tables :- category, event, subcategory, subevents, userevents, users using Knex Migration CLI.

- You can use the migration I've created or delete those migrations. Delete knexfile.js and knex folder from backend.


### Knex configurations

- Install `knex@0.21.19` globally.
```terminal
$ npm i -g knex@0.21.19
```

- Check knex version using 
```terminal
$ knex --version
```

- Now move to backend folder.

- Now run `knex init` to create `knexfile.js` which will use various configuration settings for module and migrations.

```terminal
$ knex init
```

- Your `knexfile.js` will be created in the current folder.

<details>
<summary>knexfile.js</summary>
<p>

```js
// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: "event",
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: "event",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: "event",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },
};

```
</p>
</details>
- In this file there is configuration define for three environments :- development, staging, and production.

- We will use development environment only.

- `development` key contains your configurations for database and migrations.

- `client` is the database name you want to connect.

- In `connection` define host, user, password and database name you've created in your `localhost/phpmyadmin`.

- In `migrations` define your directory in which migration will store. 

- `__dirname` it will store the `/knex/migrations` in current working directory. In our case it is `backend`.

### Create Migrations

- Run `knex migrate:make migration_name` to make your migration.
```console
$ knex migrate:make category
```
```console
Using environment: development
Using environment: development
Using environment: development
Created Migration: /var/www/html/git_folder/frontend/backend/knex/migrations/20221220122511_category.js
``` 
- It will automatically build your migration in the folder `backend/knex/migrations/migration_name`.

- After that your directory structure will look like this.
```
backend
├── app.js
├── bin
│   └── www
├── knex
│   └── migrations
│       ├── 20221220122511_category.js

```

- Initially `20221220122511_category.js` file have only predefined template.

```js

exports.up = function(knex) {
};

exports.down = function(knex) {
};

```

- Now we have to write queries to create tables.

```js

exports.up = function(knex) {
  return knex.schema.createTable("category", function (table) {
    table.increments("id").primary();

    table.string("name", 50).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("category");
};
```

- In `exports.up` you will return your query to create tables. Here I've created tableName `category` and in the function I've define
the table structure.

- `table.increments("id").primary()` will create table with column "id" which is primary key and AUTO_INCREMENT and "name" which is varchar(255).

- In `exports.down` you will return the query to drop tables.

- Now run `knex migrate:latest --env development` or `knex migrate:up migration_name` to run the migration which will create the table in database.

```terminal
$ knex migrate:latest --env development
OR
$ knex migrate:up 20221220122511_category.js
```

- `knex migrate:latest` will run the latest migration while `knex migrate:up` will run the migrations which haven't runs.

- After that your table structure will look like this.

| name | Type | Extra
--- | --- | ---
| id | int | AUTO_INCREMENT
| name | varchar(255) | 

- Now if you want to use my migrations just run `knex migrate:up` to run all the migrations. [migrations](https://gitlab.com/rohitsamal.mvteams/frontend/-/tree/main/backend/knex/migrations)


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

```js
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
  ```js
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

  - [userevents.js](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/backend/routes/userevents.js)


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

  ```js
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
  
  ```js
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

  - This module contains SelectField for selction of categories from dropdown and TextFields for subcategory and Add SubCategory button.

  - This module fetch all categories from database using api "http://localhost:3001/category". and store the data in menu option of select field.

```js
    const getCategory = (callback) => {
            axios.get("http://localhost:3001/category").then((response) => {
              console.log(response.data);
              callback(response.data);
            }).catch(err => {
              console.log(err)
            });
    }
```

  - This module add category using function "addSubCategory" which uses api "http://localhost:3001/subcategory/add".

```js
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

  - This module use "/category", "/subcategory/add" routes for request and response. 

```js
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

```js
    router.post("/add", async (req, res) => {
      try {
        await new SubCategory(req.body)
          .save()
          .then((addSubCategory) => {
            res.send(addSubCategory);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    });
```

  ### ADD Events

  - This module contains an Category SelectField, SubCategory SelectField, Event (Title, Description, Image, start_date, end_date) field and Add Event Button. Below is the event object in which we store the form data and send to the node.

```js
  const [event, setEvent] = useState({
    cat_id: "",
    subCategoryId: "",
    title: "",
    description: "",
    image: "",
    startDate: "",
    endDate: "",
```js
    router.get("/", async (req, res) => {
      try {
        await new Category()
          .fetchAll()
  });
```

  - This module contain components for different fields.

  - [CategorySelect](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/frontend/src/component/Admin/CategorySelect.js) component for category select field.

    - This component only deals with fetching the category data from database using node and save that data in a state so it can be used for fetching speific subcategory.

    - It uses api "http://localhost:3001/category" by calling function `getCategory(setNames)` from `FetchAll.js` to fetch category data and set it to the state `const [names, setNames] = useState([])` and this state maps through the MenuItem for SelectField.

    - To store category names from dropdown it uses `handleCategoryChange()` function. This function also sets the global state for event and category_id with category_id using props.

    - This function also clears the subcategory field if user again select category so that new subcategory according to selected category will be shown.

```js
  // Variable for storing category names after admin selects from dropdown
  const [categoryNameSelect, setCategoryName] = useState([]);


  // handle category select
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    names.forEach((data) => {
      if (value === data.name) {
        props.setEvent({ ...props.event, cat_id: data.id });
        props.setCatId({ ...props.catId, id: data.id });
      }
    });
    setCategoryName(value);
    props.subCatIdSet.clear();
    props.subCategoryNameToggle.splice(0, props.subCategoryNameToggle.length);
  };
```

  - [SubCategorySelect](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/frontend/src/component/Admin/SubCategorySelect.js) component for sub-category select field.

    - This component deals with fetching the data of specific sub-category according to selected category using the state in which selected category_id data is stored. This component uses SelectField in which mutliple data can be selected.Therefore this component stores the mutliple sub-category id's in a state `subCatIdSet` as a set so on deselect data can be removed from state also and duplicate data will not stored.

    - This componenet uses functions `handleSubCategoryChange()`, `getSubCatId()` and `useEffect`.

    - `useEffect` will fetch the subcategory data according to slected category by using state `catId` which we have set in the `CategorySelect` component. This sets the state `subCategoryNameSelect` with the fetched subcategory to display subcategory in the dropdown.

      ```js
        const [subCategoryNameSelect, setSubCategoryName] = useState([]);

        useEffect(() => {
          if (props.catId.id) {
            axios
              .post("http://localhost:3001/subcategory/specific", props.catId)
              .then((response) => {
                setSubCategoryName(response.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }, [props.catId]);
      ```

    - In every dropdown option for subcategory there is onClick to get the id of that selected subcategory using function `getSubCatId(row.id)`. This fuction take the id and add ito the global state `subCatIdSet` using function `props.setSubCatIdSet` and delete `id` if admin deselect that subcategory. 

      ```js
        const getSubCatId = (e) => {
          console.log("Sub Category Id : ", e);
          if (props.subCatIdSet.size === 0) {
            props.setSubCatIdSet((prevState) => new Set(prevState).add(e));
            // console.log(typeof subCatIdSet);
          } else if (props.subCatIdSet.has(e)) {
            props.subCatIdSet.delete(e);
            console.log(
              "Deleted values in set of id's of sub categories : ",
              props.subCatIdSet
            );
          } else {
            props.setSubCatIdSet((prevState) => new Set(prevState).add(e));
            // console.log(event)
          }
        };
      ```

    - Function `handleSubCategoryChange` sets the global state `subCategoryNameToggle` which stores the names of sub-category with the selected subcategory and used as value attribute for subcategory field to show the sub-categories selected as a strings.

      ```js
        const handleSubCategoryChange = (event) => {
          const {
            target: { value },
          } = event;
          props.setSubCategoryNameToggle(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
          );
          // console.log(subCategoryNameSelect);
        };
      ```

  - Title and Description TextFields have onChange on them to store these values in global state event.

      ```js
        <TextField
          label="Event Title"
          variant="outlined"
          name="eventtitle"
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
            required
          />
        {/*Event Description Field */}
        <TextareaAutosize
          placeholder="Event Description *"
          variant="outlined"
          name="description"
          minRows={10}
          onChange={(e) =>
            setEvent({ ...event, description: e.target.value })
          }
          style={{
            borderRadius: "4px",
            padding: "16.5px 14px",
            font: "inherit",
            fontSize: "inherit",
            borderColor: "#c1c2c0",
          }}
          required
        />
      ```
     

  - [EventDate](https://gitlab.com/rohitsamal.mvteams/frontend/-/blob/main/frontend/src/component/Admin/EventDate.js) component for dates fields.
    - This component has Date field for start and end date. It stores the start date and end date in a Event object. It has two functions `handleStartDate` and `handleEndDate`.

    - This two function get the selected date, set the value for date fields and store the values in global state `event` object.

      ```js
        const handleStartDate = (newValue) => {
          props.setStartValue(newValue);
          props.setEvent({
            ...props.event,
            startDate: newValue.$d.toISOString().slice(0, 19).replace("T", " "),
          });
        };

        // function for handling end event date & time
        const handleEndDate = (newValue) => {
          props.setEndValue(newValue);
          props.setEvent({
            ...props.event,
            endDate: newValue.$d.toISOString().slice(0, 19).replace("T", " "),
          });
        };
      ```

  - For images I've used `input` field with type `image` and onChange event with `saveFile` function. It will store the file data in state `file` which we used to store the image in database.

  - For add the event in database there is ` Add Event` button with submit type which onClick trigger `addEvent` function. 

    <details>
      <summary>addEvent function</summary>
      <p>

        ```js
            const addEvent = (e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            if (startvalue < new Date()) {
              alert("Please choose date greter than today's date");
            }
            if (startvalue > endvalue) {
              alert("Event Start Date can not  be greater than event end date");
              return false;
            }
            console.log(startvalue > endvalue);
            data.append("file", file);
            event.image = data;
            // const res = Object.assign(...Array.from(subCategoryIds, v => ({[v]:''} )  ));
            console.log(subCategoryIds);
            // console.log(res)
            let item = [];
            subCategoryIds.forEach((data) => {
              console.log(data);
              item.push(data);
            });
            console.log(item);
            event.subCategoryId = item;
            axios
              .post("http://localhost:3001/event/addImage", event.image)
              .then((res) => {
                console.log(res.data);
              })
              .then(() => {
                axios.post("http://localhost:3001/event/add", event).then((res) => {
                  console.log(res.data);
                  alert("Event has been added successfully");
                  navi('/admin')
                });
            });
            };
        ```
      </p>
    </details>

    - This function gets the value of form data and store in the `data` Variable.

    - This function will check if the dates are correctly selected or not. Like event start date can't be lesser than today's date and can't be greater than event's end date.
      ```js
          if (startvalue < new Date()) {
            alert("Please choose date greter than today's date");
          }
          if (startvalue > endvalue) {
            alert("Event Start Date can not  be greater than event end date");
            return false;
          }
      ```

    - Now it will append the state `file` in variable `data` to store the image on the database. `data.append("file", file)` and store variable in `event` object with the key `image`.

    - Also get the subcategory id from set `subCategoryIds` and use forEach to traverse it to store the ids in temp variable `item` and set `item` to the `event` object with `subCategoryId` key.

    - Now it sends the request to node using axios on api `http://localhost:3001/event/addImage` to store image on backend and request the image name by which it is stored in the backend. By definition in backend image will stored in folder `backend/public/images`. The code for request and route definition is given below.
      ```js
          axios
            .post("http://localhost:3001/event/addImage", event.image)
            .then((res) => {
              console.log(res.data);
            }).then(() => {
              // here we will send axios request for add the event
            })
      ``` 

    - Image upload :- For image uplaod `multer` is used. 

      ```js
          const multer = require("multer");
          const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, "public/images");
            },
            filename: (req, file, cb) => {
              cb(null, Date.now() + "-" + file.originalname);
            },
          });
          const upload = multer({ storage: storage }).single("file");

      ```

    - uplaod function will used to store image in the backend.

    - route `event/addImage`
     
      ```js
          router.post("/addImage", async (req, res) => {
            upload(req, res, (err) => {
              if (err) {
                res.sendStatus(500);
              }
              res.send(req.file);
              console.log(req.file);
              imgName = req.file.filename;
              console.log(imgName);
            });
          });
      ```
    
    - Here image name is stored in `imgName` which is used to store in the databse. When this route send response our frontend will request to new api `http://localhost:3001/event/add` to add the event.

      ```js
          axios
            .post("http://localhost:3001/event/addImage", event.image)
            .then((res) => {
              console.log(res.data);
            })
            .then(() => {
              axios.post("http://localhost:3001/event/add", event).then((res) => {
                console.log(res.data);
                alert("Event has been added successfully");
                navi('/admin')
              });
            });
      ```
    - Here it send the request to api which will go to route `/event/add`.

      ```js
          router.post("/add", async (req, res) => {
            let subCategory = req.body.subCategoryId;
            try {
              let event = await new Event({
                category_id: req.body.cat_id,
                title: req.body.title,
                description: req.body.description,
                image: imgName,
                start_date: req.body.startDate,
                end_date: req.body.endDate,
              })
                .save()
                .catch((err) => {
                  console.log("Add Event Route : ", err);
                });
              let events = event.toJSON();
      
              // adding subcategory_id for events in subevent table
              subCategory.forEach(async (data) => {
                console.log(data)
                await new SubEvent({
                  subcategory_id: data,
                  event_id: events.id,
                })
                  .save()
                  .catch((err) => {
                    console.log("Adding subevent : ", err);
                  });
              });
              res.send("Event has been added");
            } catch (err) {
              console.log(err);
            }
          });
      ```

    - This route first add event in the `event` table using model `Event`. Then use the `subCategoryId` array to iterate for each `subcategory_id` and store the event_id for all selected subcategories in `subevent` table with the `subcategory_id`. Now our event is added and send the response that event is added and navigate to the landing page for admin.









