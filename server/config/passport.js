const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  GOOGLE_CALLBACK_URL,
  JWT_SECRET,
} = require("./constants");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET_ID,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          username: profile.emails[0].value,
          googlePicture: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          let user = await User.findOne({
            googleId: profile.id,
          });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  /* `passport.serializeUser` is a method provided by the Passport.js library that is used to serialize
the user object and store it in the session. In this specific code block, it takes in a user object
and a callback function `done`. The `done` function is called with two arguments, the first argument
is an error object (if any) and the second argument is the user's id. The user's id is then stored
in the session. */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  /* `passport.deserializeUser` is a method provided by the Passport.js library that is used to
  deserialize the user object from the session. In this specific code block, it takes in a user id
  and a callback function `done`. The `User.findById` method is used to find the user with the given
  id in the database. If the user is found, the user object is passed to the `done` function as the
  second argument. If there is an error, the error object is passed as the first argument to the
  `done` function. The deserialized user object is then available on the `req.user` object in
  subsequent requests. */
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
