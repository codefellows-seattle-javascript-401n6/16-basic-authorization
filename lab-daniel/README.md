``` const USER = new mongoose.Schema({}) ```
This is my model that takes in a username, an email, and a password

``` app.use('/api', router) ```
This is the initial starting route on my server. It will utilize the exported router file.

``` router.get('/signin', (req, res) => {}); ```
This get request takes in a user and compares the password. It will make sure the password is correct. If the password matches, it will return a ``200`` status. If the password does not match, it will return a ``401`` status. It will also return ``401`` for an error.

``` router.post('/signup', (req, res) => {}); ```
This post request will create a new ``User`` using the my mongoose model. If the post request is successful, it will return ``200``. if the post request is unsuccessful, it will return ``400``.