import jwt from 'jsonwebtoken'
export const tokenController = {};

const SECRET_KEY = process.env.SECRET_KEY;

// Create the token
tokenController.createToken = (req, res, next) => {
  // 1. access username and position
  const { position, username } = res.locals.user;

  // 2. create a token using jwt.sign() and a second token if position is admin
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  // 3. save the token in res.locals
  res.locals.token1 = token;

  // 4. repeat if position is admin
  if (position === 'admin') {
    const adminToken = jwt.sign({ position }, SECRET_KEY, { expiresIn: '1h' });
    res.locals.token2 = adminToken;
  }


  return next();
}

// Verify the token
// Get Admin token
tokenController.authenticateToken = (req, res, next) => {
  console.log("Headers are", req.headers);
  const authHeader = req.headers.authorization; // 'Bearer ${token}'
  const adminHeader = req.headers["x-admin-token"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid credentials" });
    }
    res.locals.username = decoded.username;

    if (adminHeader) {
      const adminToken = adminHeader.split(" ")[1];

      jwt.verify(adminToken, SECRET_KEY, (adminErr, adminDecoded) => {
        if (adminErr) {
          return res.status(403).json({ error: "Invalid admin credentials" });
        }
        res.locals.admin = true;
        return next();
      });
    } else {
      res.locals.admin = false;
      return next();
    }
  });

    
}
