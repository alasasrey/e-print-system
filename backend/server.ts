//REMEMBER: IF YOU WANT TO INSTALL A PACKAGE USE THIS COMMAND!
// "npx expo install anypakage"
//NOT THIS: "npm install anypakage" your code and nodejs will break

//REMEMBER: USE THIS COMMAND TO RUN THE BACKEND SERVER!!!
//npm run backend-server
// or
//npx tsx backend/server.ts

import bcrypt from "bcrypt";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { RowDataPacket } from "mysql2";
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

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
// Serve the uploads folder statically so files can be accessed
app.use("/uploads", express.static("uploads"));

// REMEMBER: THIS IS JUST A TEST FOR REQUESTS AND RESPONCES DELETE THIS BLOCK OF CODE IF DONE
// --- Custom Logging Middleware ---
const requestResponseLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Log the incoming request details
  console.log(
    `[Request] Method: ${req.method} | URL: ${req.url} | Body:`,
    req.body,
  );

  // 'end' event is emitted when the response has been sent to the client
  res.on("finish", () => {
    // Log the outgoing response details
    console.log(
      `[Response] Status: ${res.statusCode} | Method: ${req.method} | URL: ${req.url}`,
    );
    // Note: Logging the response body directly is more complex and often requires buffering
  });

  // Pass control to the next middleware or route handler
  next();
};

// Use the middleware for all routes
app.use(requestResponseLogger);
// ====================================================================

// login
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body; // Extract credentials from body

  try {
    // 1. Find user by unique identifier (email)
    const [rows] = await database.query<IUserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    const user = rows[0];

    // 2. Validate user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate a secure token (JWT)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "super_secret_key_123", // Add a fallback
      { expiresIn: "1h" },
    );

    // 4. Return success and token (Do NOT return the password hash)
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//TODO: FINISH THIS CODE!!!
// register
app.post("/register", async (req: Request, res: Response) => {
  const { fullName, studentId, email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 1. Check if user already exists
    const [existingUser]: any = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Save to database
    const [result]: any = await database.query(
      "INSERT INTO users (fullName, student_id, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullName, studentId, email, passwordHash, role || "student"],
    );

    // Generate token so the user can be logged in immediately
    const token = jwt.sign(
      { userId: result.insertId, email: email },
      process.env.JWT_SECRET || "super_secret_key_123",
      { expiresIn: "1h" },
    );

    // SEND BACK the token and role
    res.status(201).json({
      message: "User registered successfully",
      token,
      role: role || "student",
      user: { id: result.id, email: result.email },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
});


// ==================================================================
//STUDENT

app.get("/home/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // Query database for a specific user
    const [rows]: any = await database.query(
      "SELECT fullname FROM users WHERE id = ?",
      [userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the first user found back to React Native
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST endpoint for submitting jobs
app.post(
  "/submit-job",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const {
        userId,
        printShopId,
        pages,
        copies,
        paperSize,
        colorMode,
        orientation,
        binding,
        notes,
      } = req.body;

      // 1. Handle File Information
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileName = req.file.originalname;
      const fileUrl = req.file.path; // Or your S3/Cloudinary URL
      const fileType = req.file.mimetype;

      // 2. Simple Price Calculation (Example: 5 per page)
      const pricePerPage = colorMode === "color" ? 5 : 2;
      const totalPrice = parseInt(pages) * parseInt(copies) * pricePerPage;

      // 3. Match your Database Schema
      const query = `
      INSERT INTO print_jobs 
      (user_id, print_shop_id, file_name, file_url, file_type, pages, copies, 
       paper_size, color_mode, orientation, binding, notes, status, payment_status, total_price) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        userId,
        printShopId,
        fileName,
        fileUrl,
        fileType,
        parseInt(pages) || 1,
        parseInt(copies) || 1,
        paperSize,
        colorMode,
        orientation,
        binding,
        notes || "",
        "pending", // Default status
        "unpaid", // Default payment_status
        totalPrice,
      ];

      const [result]: any = await database.query(query, values);

      res.status(201).json({
        message: "Job submitted successfully!",
        jobId: result.insertId,
      });
    } catch (error) {
      console.error("Submission Error:", error);
      res.status(500).json({ message: "Error submitting job" });
    }
  },
);

// GET endpoint to fetch all print jobs for a specific user
app.get("/student-orders/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const query = `
            SELECT 
                pj.*, 
                u.fullName as shopName 
            FROM print_jobs pj
            LEFT JOIN users u ON pj.print_shop_id = u.id
            WHERE pj.user_id = ?
            ORDER BY pj.created_at DESC`;

    const [rows]: any = await database.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

app.get("/profile/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    // Query database for a specific user
    const [rows]: any = await database.query(
      "SELECT fullname, email FROM users WHERE id = ?",
      [userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the first user found back to React Native
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all active print shops for the Student to choose from
app.get("/print-shops", async (req, res) => {
  try {
    const [rows] = await database.query(
      "SELECT id, name, address FROM print_shops WHERE is_active = TRUE",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops" });
  }
});
// ==================================================================

// MANAGERS
// GET only shops owned by a specific owner (For the Owner App)
app.get("/my-shops/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [myShop] = await database.query(
      "SELECT * FROM print_shops WHERE user_id = ?",
      [userId],
    );


    //PUTTING THIS IN AN OBJECT SO THAT I CAN SEND ONE
    res.json(myShop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your shops" });
  }
});

app.get("/manager-dashboard/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // 1. Check if manager has a shop
    const [shop]: any = await database.query(
      "SELECT id FROM print_shops WHERE user_id = ?",
      [userId],
    );

    if (!shop || shop.length === 0) {
      return res.json({ noShop: true });
    }

    const shopId = shop[0].id;

    // 2. Updated Query with NULL checks
    // IMPORTANT: Verify that 'total_price' and 'created_at' exist in your DB!
    const [stats]: any = await database.query(
      `SELECT 
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
          COUNT(CASE WHEN status = 'processing' THEN 1 END) as processing,
          COUNT(CASE WHEN status = 'ready' THEN 1 END) as ready,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as approved,
          SUM(CASE WHEN DATE(created_at) = CURDATE() THEN total_price ELSE 0 END) as dailyRevenue,
          SUM(total_price) as totalRevenue
       FROM print_jobs 
       WHERE print_shop_id = ?`,
      [shopId],
    );

    // Safeguard against null values from SUM()
    const daily = stats[0].dailyRevenue || 0;
    const total = stats[0].totalRevenue || 0;

    res.json({
      noShop: false,
      pending: stats[0].pending || 0,
      processing: stats[0].processing || 0,
      ready: stats[0].ready || 0,
      approved: stats[0].approved || 0,
      dailyRevenue: `₱${parseFloat(daily).toFixed(2)}`,
      totalRevenue: `₱${parseFloat(total).toFixed(2)}`,
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err); // This prints the EXACT SQL error in your terminal
    res.status(500).json({ error: "Database error", details: err });
  }
});

//FINISH THIS CODE
//WHAT IS THIS CODE USE FOR????
app.post("/manager-dashboard/:userId", async (req, res) => {
  try {
    const { userId } = req.body;

    // 3. Match your Database Schema
    const query = `
      INSERT INTO print_jobs 
      (user_id, print_shop_id, file_name, file_url, file_type, pages, copies, 
       paper_size, color_mode, orientation, binding, notes, status, payment_status, total_price) 
      VALUES (?)`;

    const values = [userId];

    const [result]: any = await database.query(query, values);

    res.status(201).json({
      message: "Job submitted successfully!",
      jobId: result.insertId,
    });
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: "Error submitting job" });
  }
});

// app.get("/manager-orders", async (req, res) => {
//   try {
//     const [orders]: any = await database.query(`SELECT *  FROM print_jobs`);

//     res.json({
//       orders,
//     });
//   } catch (err) {
//     console.error("DASHBOARD ERROR:", err); // This prints the EXACT SQL error in your terminal
//     res.status(500).json({ error: "Database error", details: err });
//   }
// });

//TODO: PLEASE FIX THIS CODE!!!
app.get("/manager-orders/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    // 1. Get the Shop ID owned by this manager
    const [shops]: any = await database.query(
      "SELECT id FROM print_shops WHERE user_id = ?",
      [userId],
    );

    if (shops.length === 0) return res.json([]);

    const shopId = shops[0].id;

    // 2. Get all jobs for this shop
    const [orders]: any = await database.query(
      `SELECT * FROM print_jobs WHERE print_shop_id = ? ORDER BY created_at DESC`,
      [shopId],
    );

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching manager orders" });
  }
});

app.put("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = `UPDATE print_jobs SET status = ? WHERE id = ?`;
    await database.query(query, [status, id]);
    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Database update failed" });
  }
});

//TODO: PLEASE FIX THIS CODE!!!
// Add 'upload.none()' as middleware to this specific route
app.post(
  "/manager-settings/",
  upload.none(),
  async (req: Request, res: Response) => {
    try {
      const {
        userId,
        name,
        address,
        contactNumber, // from frontend
        operatingHours, // from frontend
        is_active,
      } = req.body;

      // The query columns MUST match your DESCRIBE output exactly
      const query = `
      INSERT INTO print_shops 
      (user_id, name, address, contact_number, operating_hours, is_active) 
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        address = VALUES(address),
        contact_number = VALUES(contact_number),
        operating_hours = VALUES(operating_hours),
        is_active = VALUES(is_active)
    `;

      const values = [
        userId,
        name,
        address,
        contactNumber, // Maps to contact_number
        operatingHours, // Maps to operating_hours
        is_active == "true" || is_active == "1" ? 1 : 0,
      ];

      const [result]: any = await database.query(query, values);

      res.status(200).json({
        message: "Success",
        details:
          result.affectedRows === 2
            ? "Updated existing shop"
            : "Created new shop",
      });
    } catch (error) {
      console.error("Settings Error:", error);
      res.status(500).json({ message: "Database Error" });
    }
  },
);

// server.ts
app.delete("/manager/delete-shop/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // We use DELETE to remove the record from the print_shops table
    const query = `DELETE FROM print_shops WHERE user_id = ?`;

    const [result]: any = await database.query(query, [userId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Print Shop Deleted successfully!" });
    } else {
      res.status(404).json({ message: "Shop not found." });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete('/manager/delete/print-shop-account/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // We use DELETE to remove the record from the print_shops table
    const query = `DELETE FROM users WHERE id = ?`;

    const [result]: any = await database.query(query, [userId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Print Shop Account Deleted successfully!" });
    } else {
      res.status(404).json({ message: "Print Shop Account not found." });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// -===============================================================================

// ADMIN

//TODO: MAYBE FOR FUTURE ADMIN REGISTRATION FOR MANAGERS???
// if (role === "manager") {
//   await database.query(
//     "INSERT INTO print_shops (user_id, name, is_active) VALUES (?, ?, ?)",
//     [result.id, "My New Print Shop", false], // Set as inactive by default or 0
//   );
// }

// ==============================================================================

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
