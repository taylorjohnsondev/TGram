module.exports = {
  /* This is a middleware function called `ensureAuth` that checks if the user is authenticated. If the
 user is authenticated, it sets the `user` property of the `locals` object on the `app` object to
 the `user` object on the `req` object and calls the `next()` function to pass control to the next
 middleware function. If the user is not authenticated, it redirects the user to the login page. */
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.app.locals.user = req.user;

      return next();
    } else {
      res.redirect("/login");
    }
  },
  /* `ensureGuest` is a middleware function that checks if the user is not authenticated. If the user
  is not authenticated, it calls the `next()` function to pass control to the next middleware
  function. If the user is authenticated, it redirects the user to the home page. This function is
  typically used to prevent authenticated users from accessing certain pages or routes that are only
  meant for guests or unauthenticated users. */
  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
};
