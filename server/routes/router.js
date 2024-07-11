import { Router } from 'express';
const router = Router();


/**
 
 Type of Routers:

 - register - create account
 - login - validate account, update, delete
 - shifts (employee) - get shifts, request pickup, request drop, cancel request, (request swap)
 - shifts (manager) - create shifts, get all/specific shifts, get requests,  update shift, approve request, deny request
 
 */


export default router;

// // need get router to get shifts array and send back to the front end
// app.get('/shifts', tokenController.authenticateToken, shiftController.getShifts, (req, res) => {
//   console.log('---> routed through /shifts\n');
//   const shifts = [res.locals.shifts, res.locals.availableShifts];
//   console.log('shifts', shifts)
//   return res.status(200).json(shifts);
//   // json-shifts = "[ {date, employee(username), available, userId}, {}...]"
// })
// // Route (/register) GET 
// // app.get('/register', (req, res) => {
// //   console.log('we are in the server')
// //   return res.status(200).send('GET request to /register');
// // })

// // Route (/register) GET 
// // app.get('/register', (req, res) => {
// //   console.log('we are in the server')
// //   return res.status(200).send('GET request to /register');
// // })

// // Route (/register) GET 
// // app.get('/register', (req, res) => {
// //   console.log('we are in the server')
// //   return res.status(200).send('GET request to /register');
// // })


// // Route (/register) POST // Create a user
// app.post('/register', userController.createUser, (req, res) => {
//   console.log('---> routed through /register');
//   // server responds with status (201) indicating user has been created
//   // server responds with user information of the new user created
//   return res.status(201).json(res.locals.user);
// })


// // Route (/login) POST // Login a user
// app.post('/login', userController.verifyUser, (req, res) => {
//   console.log('---> routed through /login\n');
//   // Return token to client side to save to localStorage
//   console.log('res.locals.userInfo', res.locals.userInfo)
  
//   const {username} = res.locals.userInfo;
//   //created token for each user with 5min expiration
//   const token = jwt.sign({username: username}, SECRET_KEY, { expiresIn: '5mins'});
//   console.log('login:token:', token) // crazy long string
//   // created cookie using token
//   // sends cookie to client side after the user logins in
//   const cookie = res.cookie('token', token, { 
//     secure: true, 
//     httpOnly: true, 
//     maxAge: 300000
//   });
//   // console.log('cookie in login:', cookie.cookies);
//   // server responds with status (202) indicating user has been accepted

//   //trying to send cookie 
//   return res.status(202).send('cookie sent');
// })
