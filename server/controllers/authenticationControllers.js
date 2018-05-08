const bcrypt = require('bcrypt');
const rand = require('random-key');

const {registrationEmail} = require('./nodemailer');

const saltRounds = 10;

const residentRegistration = (req, res) => {
  const db = req.app.get('db');
  const {
    email, password, firstName, lastName,
  } = req.body;

  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      db
        .resident_registration([email, hash, firstName, lastName])
        .then((response) => {
          if (response.length > 0) {
            req.session.user = {
              email,
              role: 'resident',
              userid: response[0].residentid || 0,
              unitid: response[0].unitid || 0,
            };
            return res.status(200).json({
              authenticated: true,
              role: 'resident',
              email,
              userid: response[0].residentid || 0,
              unitid: response[0].unitid || 0,
              firstName: response[0].firstname,
              lastName: response[0].lastname,
            });
          }
          return res
            .status(200)
            .json({authenticated: false, email, userid: response[0].residentid || 0});
        })
        .catch(err =>
          res.status(200).json({
            authenticated: false,
            email,
            userid: 0,
            error: `${err}`,
          }));
    });
  });
};

const ownerRegistration = (req, res) => {
  const db = req.app.get('db');
  const {
    email, password, firstName, lastName, companyName,
  } = req.body;

  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      db
        .owner_registration([email, hash, firstName, lastName, companyName])
        .then((response) => {
          if (response.length > 0) {
            req.session.user = {email, role: 'owner', userid: response[0].ownerid || 0};
            return res.status(200).json({
              authenticated: true,
              role: 'owner',
              email,
              userid: response[0].ownerid || 0,
            });
          }
          return res
            .status(200)
            .json({authenticated: false, email, userid: response[0].ownerid || 0});
        })
        .catch(err =>
          res.status(200).json({
            authenticated: false,
            email,
            userid: 0,
            error: `${err}`,
          }));
    });
  });
};

const residentLogin = (req, res) => {
  const db = req.app.get('db');
  const {email, password} = req.body;

  db
    .resident_login(email, password)
    .then((response) => {
      if (response.length > 0) {
        const hash = response[0].password;
        bcrypt.compare(password, hash, (err, result) => {
          if (result === true) {
            req.session.user = {
              email,
              role: 'resident',
              userid: response[0].residentid || 0,
              propertyid: response[0].propertyid || 0,
              unitid: response[0].unitid || 0,
            };
            return res.status(200).json({
              authenticated: true,
              role: 'resident',
              email,
              userid: response[0].residentid || 0,
              unitid: response[0].unitid || 0,
              firstName: response[0].firstname,
              lastName: response[0].lastname,
            });
          }
          return res.status(200).json({
            authenticated: false,
            email,
            userid: response[0].residentid || 0,
            error: 'Password is invalid.',
          });
        });
      } else {
        return res.status(200).json({
          authenticated: false,
          email,
          userid: 0,
          error: 'User does not exist!',
        });
      }
    })
    .catch(err =>
      res.status(200).json({
        authenticated: false,
        email,
        userid: 0,
        error: `${err}`,
      }));
};

const ownerLogin = (req, res) => {
  const db = req.app.get('db');
  const {email, password} = req.body;

  db
    .owner_login([email, password])
    .then((response) => {
      if (response.length > 0) {
        const hash = response[0].password;
        bcrypt.compare(password, hash, (err, result) => {
          if (result === true) {
            req.session.user = {email, role: 'owner', userid: response[0].ownerid || 0};
            return res.status(200).json({
              authenticated: true,
              email,
              role: 'owner',
              userid: response[0].ownerid || 0,
              firstName: response[0].firstname,
              lastName: response[0].lastname,
            });
          }
          return res.status(200).json({
            authenticated: false,
            email,
            userid: response[0].ownerid || 0,
            error: 'Password is invalid.',
          });
        });
      } else {
        return res.status(200).json({
          authenticated: false,
          email,
          userid: 0,
          error: 'User does not exist!',
        });
      }
    })
    .catch(err =>
      res.status(200).json({
        authenticated: false,
        email,
        userid: 0,
        error: `${err}`,
      }));
};

const logout = (req, res) => {
  req.session.destroy();
  return res.status(200).json({authenticated: false, email: null});
};

const addResident = (req, res) => {
  const {
    email, propertyID, unitID, firstName, lastName,
  } = req.body;

  const password = rand.generate(6);
  let hashedPassword = '';

  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        res.status(200).json({created: false, user: null, error: `${hashError}`});
      } else {
        hashedPassword = hash;
        const db = req.app.get('db');
        db
          .resident_add([
            email,
            hashedPassword,
            propertyID,
            unitID,
            req.session.user.userid,
            firstName,
            lastName,
          ])
          .then((response) => {
            registrationEmail(email, password);
            return res.status(200).json({created: true, user: response[0]});
          })
          .catch(err => res.status(200).json({created: false, user: null, error: `${err}`}));
      }
    });
  });
};

const getCurrentUser = (req, res) => res.status(200).json({user: req.session.user});

const residentForgotPassword = (req, res) => {
  const password = rand.generate(6);
  const {email} = req.body;
  let hashedPassword = '';

  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        res.status(200).json({updated: false, user: email, error: `${hashError}`});
      } else {
        hashedPassword = hash;
        const db = req.app.get('db');
        db
          .resident_forgotPassword([hashedPassword, email])
          .then((response) => {
            registrationEmail(response[0].email, password);
            return res.status(200).json({updated: true, user: response[0]});
          })
          .catch(err => res.status(200).json({updated: false, user: email, error: `${err}`}));
      }
    });
  });
};

const ownerForgotPassword = (req, res) => {
  console.log(req.body);
  const password = rand.generate(6);
  const {email} = req.body;
  let hashedPassword = '';

  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        res.status(200).json({updated: false, user: email, error: hashError});
      } else {
        hashedPassword = hash;
        const db = req.app.get('db');
        db
          .owner_forgotPassword([hashedPassword, email])
          .then((response) => {
            registrationEmail(response[0].email, password);
            return res.status(200).json({updated: true, user: response[0]});
          })
          .catch(err => res.status(200).json({updated: false, user: email, error: `${err}`}));
      }
    });
  });
};

module.exports = {
  residentRegistration,
  ownerRegistration,
  residentLogin,
  ownerLogin,
  logout,
  addResident,
  getCurrentUser,
  residentForgotPassword,
  ownerForgotPassword,
};
