// import server && connect to db
import "dotenv/config";
import createServer from "./utils/server.js" 
import dbConnect from "./utils/connect.js" 

// create variable for PORT
const port = process.env.PORT || 3000;

// invoke your server and save as variable (app)
const server = createServer();

//have you app listen on a port
server.listen({ port }, () => {
    console.log(`Backend Server be running on http://localhost:${port} duh`);
    dbConnect();
}); 


