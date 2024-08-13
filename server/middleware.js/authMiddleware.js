/*
authMiddleware will take users data first with the token that is found in frontend i.e in users browser.
Now take this token and see if it valide token , and if it is created from our signature only then we will the user to go i.e procced
ahead for login.

we use jwt.verify method to verify that the token it takes token from the request headers of user and the SECRET_KEY from env.


*/

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    let verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    //console.log(verifiedToken);

    // now the user is Verified and they can login or can access the component that tey are requesting
    req.body.userId = verifiedToken.userId;

    next();
  } catch (error) {
    res.send({
      success: false,
      message: "Invalid token",
    });
  }
};
