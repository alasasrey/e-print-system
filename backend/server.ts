//REMEMBER: IF YOU WANT TO INSTALL A PACKAGE USE THIS COMMAND!
// "npx expo install anypakage"
//NOT THIS: "npm install anypakage your code and nodejs will break

//REMEMBER: USE THIS COMMAND TO RUN THE BACKEND SERVER!!!
//npx tsx backend/server.ts
// or
//npm run backend-server


import express, { NextFunction, Request, Response } from 'express';
import database from "./database";

const app = express();
const port = process.env.PORT ||  3000;

app.use(express.json());

// REMEMBER: THIS IS JUST A TEST FOR REQUESTS AND RESPONCES DELETE THIS BLOCK OF CODE IF DONE
// --- Custom Logging Middleware ---
const requestResponseLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log the incoming request details
  console.log(`[Request] Method: ${req.method} | URL: ${req.url} | Body:`, req.body);

  // 'end' event is emitted when the response has been sent to the client
  res.on('finish', () => {
    // Log the outgoing response details
    console.log(`[Response] Status: ${res.statusCode} | Method: ${req.method} | URL: ${req.url}`);
    // Note: Logging the response body directly is more complex and often requires buffering
  });

  // Pass control to the next middleware or route handler
  next();
};

// Use the middleware for all routes
app.use(requestResponseLogger);
// ====================================================================

//TODO: FINISH THIS CODE!!!
// login
app.get('/login', async (req: Request, res: Response) => {
  try {
    const [rows] = await database.query('SELECT * FROM users');
    res.status(200).json(rows);
    console.log(rows);
    
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

//TODO: FINISH THIS CODE!!!
// register
app.get('/register', async (req: Request, res: Response) => {
  try {
    const [rows] = await database.query('SELECT * FROM users');
    res.status(200).json(rows);
    console.log(rows);
    
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});