# libraryManagementSystem

Basic library Management System

Requirements:

1. Only admin will be able to add students and books
2. Password will be auto generated when a student is added by admin and that password will be sent to student email that admin entered.
3. student will be able to login by using that password and their legal college email
4. on login access token , refresh token and a session is created in redis cache
5. First download the docker and run command docker-compose up -d from the root which will spin the mongo and redis images
6. access token will expire in 15 min , after which refresh token is used to generate new access token.
7. As jwt are stateless we are using session to terminate the user session on logout , by this even if tokens get compromised still no access will be granted as session will be terminated , session and refresh token have same expiration time.
