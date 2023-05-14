# Library Management System

It's a basic library management system which is being developed , and is at early stage of development.

# Flow

- It has 2 users for now , student and admin, admin will have all privileges such as adding student , removing student , adding books , removing books and all.
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
