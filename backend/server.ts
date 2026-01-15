//REMEMBER: IF YOU WANT TO INSTALL A PACKAGE USE THIS COMMAND!
// "npx expo install anypakage"
//NOT THIS: "npm install anypakage" your code and nodejs will break

//REMEMBER: USE THIS COMMAND TO RUN THE BACKEND SERVER!!!
//npm run backend-server
// or
//npx tsx backend/server.ts


import bcrypt from 'bcrypt';
import cors from "cors";
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import database from "./database";

const app = express();
const port = Number(process.env.PORT) || 3000;

// Interface for users database result
interface IUserRow extends RowDataPacket {
  id: number;
  fullName: string;
  email: string;
  studentId: string;
  password: string;
  role: string;
}

app.use(cors());
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
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body; // Extract credentials from body

  try {
    // 1. Find user by unique identifier (email)
    const [rows] = await database.query<IUserRow[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = rows[0];

    // 2. Validate user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Generate a secure token (JWT)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'super_secret_key_123', // Add a fallback
      { expiresIn: '1h' }
    );

    // 4. Return success and token (Do NOT return the password hash)
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      user: { id: user.id, email: user.email, }
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//TODO: FINISH THIS CODE!!!
// register
app.post('/register', async (req: Request, res: Response) => {
  const { fullName, studentId, email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // 1. Check if user already exists
    const [existingUser]: any = await database.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Save to database
    const [result]: any = await database.query(
      'INSERT INTO users (fullName, studentId, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [fullName, studentId, email, passwordHash, role || 'student']
    );

    // Generate token so the user can be logged in immediately
    const token = jwt.sign(
      { userId: result.insertId, email: email },
      process.env.JWT_SECRET || 'super_secret_key_123',
      { expiresIn: '1h' }
    );

    // SEND BACK the token and role
    res.status(201).json({
      message: 'User registered successfully',
      token,
      role: role || 'student'
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.1.4:${port}`);
});