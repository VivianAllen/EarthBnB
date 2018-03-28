# MakersBnB
"postgres://localhost:5432"
**Instructions for use**

To setup local database and database table for testing, run *bundle install*, then *rake
first_time_setup* from a console in the root folder of the app. This will create a bnb_test
database in your machine, with a bnb_users and a bnb_properties table populated with some fake
data. To remove these from your machine after testing, run *rake drop_db* from a console in
the root folder of the app. To reset a pre-existing database, run *rake full_reset*
from a console in the root folder of the app.

To tell the heroku app where to look for your database,
run *export DATABASE_URL=postgres://localhost:5432/bnb_test* from a console in the root folder
of the app.

Always ensure that you have the latest packages installed by running `npm install`

To run the example tests in bash, type `npm test` into your console!

```
User stories

As a potential user,
So I can use the service,
I would like to sign up to EarthBnB.

As a user,
So that I can make money,
I would like to list my property.

As a user,
So that I can make more money,
I would like to list more property.

As a user,
so that  I can see the details of the place I am staying,
I would like to see name, price and description of the property.

As a user,
So that I can see when a property is available,
I would like to see dates on a property.

As a user,
So that I can request a space,
I would like to send a request for a specified night.

As a user,
So that I can control who stays in my property,
I would like to prove/deny a request.

As a user,
So that I do not get disappointed,
I would like to see the rooms are already booked.

As a user,
So that I can take an advantage of every opportunity,
I would like to keep the space bookable until I've confirmed a request.
```
