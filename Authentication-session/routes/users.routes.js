import express from "express";
import db from "../db/index.js";
import { usersTable ,userSession} from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "crypto";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Current user (to be implemented)" });
});

// ADD THE TRY...CATCH BLOCK HERE
router.post("/signup", async (req, res) => {
  try {
   
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
    
    console.error("SIGNUP ERROR:", error); 
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try { 
    const { email, password } = req.body;
    const [existingUser] = await db
      .select({
        id:usersTable.id,
        email: usersTable.email,
        salt: usersTable.salt,
        password: usersTable.password,
      })
      .from(usersTable)
      .where((table) => eq(table.email, email));

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: `entered email: ${email} does not exists` });
    }

    const salt = existingUser.salt;
    const existingHashed = existingUser.password;

    const newHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (newHash !== existingHashed) {
      return res
        .status(400)
        .json({ error: "Incorrect password, Please try again" });
    } else {
      const [session] = await db.insert(userSession).values({
        userId:existingUser.id,
      }).returning({id:userSession.id});
      return res.status(200).json({ status: "success",sessionId : session.id });
    }
  } catch (error) { 
    console.error(" LOGIN ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
    
export default router;