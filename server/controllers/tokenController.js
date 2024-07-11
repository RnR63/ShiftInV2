import jwt from 'jsonwebtoken'
const tokenController = {};

//secret key
const SECRET_KEY = process.env.SECRET_KEY;

// Create the token
tokenController.createToken = (req, res, next) => {
    // 1. access username from req.body
    const { username } = req.body;

    // 2. create a token using jwt.sign()
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // 3. save the token in res.locals
    res.locals.token = token;

    return next();
}

// Verify the token
tokenController.authenticateToken = (req, res, next) => {
    console.log("Header is", req.headers);
    const authHeader = req.headers.authorization; // 'Bearer ${token}'

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // split = ['Bearer', '${token}']
        
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json("invalid credentials");
        }
        return next();
      });
        
    } else {
      return next({
        log: "An error occured in authController.verifyToken",
        status: 500,
        message: {
          err: "An error occured in authController.verifyToken",
        },
      });
    }

    
}

// Export tokenController
export default tokenController;


// authController.verifyToken = (req, res, next) => {
//     console.log('Header is', req.headers);
//     const authHeader = req.headers.authorization; // 'Bearer ${token}'
  
//     if(authHeader) {
//       const token = authHeader.split(' ')[1]; // split = ['Bearer', '${token}']
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       jwt.verify(token, process.env.SECRET, (err, decoded) => {
//         if (err) { return res.status(403).json('invalid credentials') } 
//         return next();
//       })
//       } else {
//         return next({
//           log: 'An error occured in authController.verifyToken',
//           status: 500,
//           message: {
//             err: 'An error occured in authController.verifyToken',
//           }, 
//         });
//       }
//   };