import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "crypto";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Current user (to be implemented)" });
});

// ADD THE TRY...CATCH BLOCK HERE
router.post("/signup", async (req, res) => {
  try {
    // All your existing code goes inside the 'try'
    const { name, email, password } = req.body;
    const [existingUser] = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where((table) => eq(table.email, email));

    if (existingUser) {
      return res
        .status(400)
        .json({ error: `entered email: ${email} already exits` });
    }

    const salt = randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        salt: salt,
      })
      .returning({ id: usersTable.id });

    return res
      .status(201)
      .json({ status: "success", data: { userId: user.id } });

  } catch (error) {
    // This 'catch' block will stop the server from crashing
    // and will show you the REAL error in your terminal.
    console.error("SIGNUP ERROR:", error); 
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login endpoint (to be implemented)" });
});

export default router;