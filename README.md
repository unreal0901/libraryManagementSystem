## Screenshots

![App Screenshot](https://drive.google.com/uc?export=view&id=1is6ban4yh8KkdI55-M0ULHBvnitutIry)

# Library management System

- This is library management system made in MERN stack.
- It's a basic library management system which is being developed , and is at early stage of development.
- I have intgrated the googlePlay books api so that admins can directly enter the book from playBooks if available there.

# Flow

- It has 2 actors for now , student and admin, admin will have all privileges such as adding student , removing student , adding books , removing books and all.
- Student will not be able to register themselves manually, admin will add/register student by proving an official email and student details and on that email auto generated password is sent and that password is also hashed and saved in database.
- Student can login into their account by sent password and will be able to access all the functionality a user of type student have , like issuing books but not adding books.

# Authentication Flow:

- Admin is already set in the database by us for now, admin can login into the account and add user.
- On login an access token and refresh token is generated which are JWT made using {sub:userId} as payload and private accesstoken key which is stored in .env file.
- After generating access token. a session is also created in redis which is blazingly fast session store, it stores session with key user.id.
- Access token, refresh token and a login flag is sent as httpOnly cookie to front end.
- Whenever someone try to access the protected routes then they have to send the accesstoken in header(Bearer format) or they have to send it inside cookie by credentials:true property.
- If client have valid access token then we can verify it with public key and get the payload and payload have user.Id as sub so we can use it to get our session from redis too.
- If client have valid access token and session then only he will be allowed to access the protected route else not.

## API Reference

There are 4 core/base routes:

- Authentication route:

```http
/api/auth
```

- Users route:

```http
/api/users
```

- Book route:

```http
/api/book
```

- Student route:

```http
/api/student
```

---

- SUB ROUTES FOR /auth :-

```http
POST /login

---------------
Registration can only be done by admin

POST /register
POST /logout
```

- SUB ROUTES FOR /book :-

```http
GET /all
POST /add
PUT /update
```

- SUB ROUTES FOR /student :-

```http
GET /mybooks
POST /issue/:bookId
POST /return/:bookId
```

- SUB ROUTES FOR /user :-

```http
GET /
GET /me
```

| Parameter      | Type     | Description                                        |
| :------------- | :------- | :------------------------------------------------- |
| `accessToken`  | `cookie` | **Required**. Required for all routes except login |
| `refreshToken` | `cookie` | **Required**. Required to refresh the access token |

- A sesion is maintained in redis DB in backend , using token deserialization of user takes place and session is also checked during process.

- Session is maintained using the id of the user and that id is also used as payload in jwt during signing.

- So jwt carries the user id when we go to any protected route and so user session is checked by id stored in jwt.

--> That is why access tokens should be sent with every subsequent requests after login, they can be sent as:

- authorization header with bearer format
- cookies (prefered just set credential include when sending request from frontend)

--> When user log in automatically 3 cookies are set

- logged_in: boolean for frontend
- accessToken
- refreshToken
  All three of them are httpOnly cookies

## Run Locally

Clone the project

```bash
  git clone https://github.com/unreal0901/libraryManagementSystem
```

For running the project locally,
first clone the project using git clone

- Project has 2 sections

1. frontend directory
2. backend directory

requirement:

- docker should be installed already

Go to the project directory

```bash
   cd backend
 npm i
 docker-compose up -d
 npm run start

cd ..
cd frontend
npm i
npm run start
```

With this both backend and frontend will be running locally in development environment.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Frontend:

- `REACT_APP_BASE_URL`="http://localhost:8000"
- `REACT_APP_GOOGLE_BOOKS_KEY`="(Your google play books api)"

### Backend:

- `NODE_ENV=development`
- `MONGODB_USERNAME=(any username for mongodb)`
- `MONGODB_PASSWORD=(any pass)`
- `MONGODB_DATABASE_NAME=(Enter any database name)`

- `ACCESS_TOKEN_PRIVATE_KEY`=
- `ACCESS_TOKEN_PUBLIC_KEY`=
- `REFRESH_TOKEN_PRIVATE_KEY`=
- `REFRESH_TOKEN_PUBLIC_KEY`=

- (Generate the keys from "https://travistidwell.com/jsencrypt/demo/")
- (Convert them to base64 encoding first then paste here: to convert use:"https://www.base64encode.org/")

<!-- These are smtp settings for nodemailer -->

- `EMAIL_USER=(Your email which you will use to send mail to others)`
- `EMAIL_PASS=(Email pass)`
- `EMAIL_HOST=(host of email) || smtp.ethereal.email`
- `EMAIL_PORT=(Email port)`

- For using nodemailer with gmail, read this article:

1. "https://miracleio.me/snippets/use-gmail-with-nodemailer/"
2. "https://mailtrap.io/blog/nodemailer-gmail/"
