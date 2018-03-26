# Basic Authentication and Authorization

## Author: Alicia Lycan

/*
Sign up route does not check for password

Sign in route checks for password

Server receives text, some if statements, once you have username and password, hash it or compare to what they just told you is in the db.

ie. you logged in or you didnt log in
400 status if someone doesnt give a sign in name or password, then send back an encrypt which
then returns a 200 if correct info entered or 401 if not authenticated
*/