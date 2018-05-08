const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const bCrypt = require('bcrypt');

// Authentication Controllers
const {
  residentForgotPassword,
  residentRegistration,
  residentLogin,
  ownerForgotPassword,
  ownerRegistration,
  ownerLogin,
  addResident,
  getCurrentUser,
  logout,
} = require('./controllers/authenticationControllers');

// Property Controllers
const {
  addProperties,
  getProperty,
  getProperties,
  deleteProperty,
  updateProperty,
} = require('./controllers/propertiesControllers');

// Unit Controllers
const {addUnit, getUnit, updateUnit} = require('./controllers/unitsControllers');

// Residents Controllers
const {
  getResidents,
  updateResident,
  getResidentsByUnit,
  getResidentDetails,
} = require('./controllers/residentsControllers');

// Workorder Controllers
const {
  workorderByPropertyId,
  workorderByResidentId,
  workorderByUnitId,
  addWorkorder,
  closeWorkorder,
} = require('./controllers/workordersControllers');

// Bills Controllers
const {addBill, getBillingHistory, getUnpaidBills} = require('./controllers/billsControllers');

// Stripe Controllers
const {stripeCharge} = require('./controllers/stripeController');

require('dotenv').config();

const app = express();
const port = 3001;

massive(process.env.CONNECTION_STRING)
  .then((dbInstance) => {
    app.set('db', dbInstance);
  })
  .catch(err => console.log(err));

app.use(cors());
app.use(json());

app.set('bCrypt', bCrypt);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000000,
  },
}));

// Resident Authentication Endpoints
app.post('/users/resident-forgot-password', residentForgotPassword);
app.post('/users/resident-registration', residentRegistration);
app.post('/users/resident-login', residentLogin);

// Owner Authentication Endpoints
app.post('/users/owner-forgot-password', ownerForgotPassword);
app.post('/users/owner-registration', ownerRegistration);
app.post('/users/owner-login', ownerLogin);

// User Endpoints
app.get('/users/logout', logout);
app.post('/users/add', addResident);
app.get('/users/current', getCurrentUser);

// Unit Endpoints
app.post('/unit/add', addUnit);
app.post('/unit/update', updateUnit);
app.get('/units/getUnit/:id', getUnit);

// Property Endpoints
app.post('/properties/add', addProperties);
app.put('/properties/update/:id', updateProperty);
app.put('/properties/deleteProperty/:id', deleteProperty);
app.get('/properties/getProperty/:id', getProperty);
app.get('/properties/getProperties', getProperties);

// Resident Endpoints
app.get('/residents/getResidents/:id', getResidents);
app.put('/residents/updateResident', updateResident);
app.get('/residents/getResidentsByUnit/:id', getResidentsByUnit);
app.get('/residents/getResidentDetails', getResidentDetails);

// Workorder Endpoints
app.post('/workorder/addWorkorder', addWorkorder);
app.put('/workorder/closeWorkorder/:id', closeWorkorder);
app.get('/workorder/getByPropertyId/:id', workorderByPropertyId);
app.get('/workorder/getByResidentId/', workorderByResidentId);
app.get('/workorder/getByUnitId', workorderByUnitId);

// Billing Endpoints
app.post('/bills/add', addBill);
app.post('/bills/pay', stripeCharge);
app.get('/bills/getBillingHistory', getBillingHistory);
app.get('/bills/getUnpaid', getUnpaidBills);

app.listen(port, () => {
  console.log(`Dr. Crane is listening on ${port}`);
});
