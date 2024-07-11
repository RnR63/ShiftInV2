// import express, path, cookie-parser, cors, and dotenv
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { loginRouter } from "../routes/loginRouter.js";
import { registerRouter } from "../routes/registerRouter.js";
import { shiftRouter } from '../routes/shiftRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import any possible Routers && Controllers
// const userController = require('./controllers/userController');
// const tokenController = require('./controllers/tokenController');
// const shiftController = require('./controllers/shiftController');

//create a function to define createServer
function createServer() {
  //create variable to invoke express (e.g. save as app)
  const app = express();
  
  // handle parsing request body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  // handle requests for static files
  app.use(express.static(path.join(__dirname, 'build')));
  
  // // handles loading the initial html page
  // app.get('/', (req, res) => {
  //   console.log('Request for INDEX.HTML received');
  //   const route = path.join(__dirname, '../build/index.html');
  //   return res.sendFile(route);
  // });
  
  // // handles the bundle.js files in the build folder
  // app.get('/bundle.js', (req, res) => {
  //   console.log('Request for bundle.js received')
  //   const route = path.join(__dirname, '../build/bundle.js');
  //   return res.sendFile(route);
  // });

  // ----- listening for any endpoints to server to router -------
  app.use('/shifts', shiftRouter);
  app.use('/login', loginRouter);
  app.use('/register', registerRouter);

  // After all routes, catch all
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })

  // Global error handler
  app.use((err, req, res, next) => {
    // defaultError object
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { error: 'An error occured'}
    }
    // combine empty object, defaultError, and (err) prioritizing (err)
    const errorObject = Object.assign({}, defaultError, err);
    return res.status(errorObject.status).json(errorObject.message);
  });
    
  //return app
  return app;
};
  
//export createServer as default since we're not using {} to import
export default createServer;
