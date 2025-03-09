import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/db";
import { serialize } from "cookie"; // For setting HTTP-only cookies

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Store this in .env for security

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Validate Input Fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // 2️⃣ Connect to Database
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
    connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    // 3️⃣ Compare Hashed Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 4️⃣ Generate JWT Token (Secure Authentication)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 5️⃣ Set Token in HTTP-Only Cookie (More Secure than LocalStorage)
    const cookieOptions = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    const response = NextResponse.json({ message: "Login successful!", redirect: "/main" }, { status: 200 });
    response.headers.set("Set-Cookie", cookieOptions); // Attach secure cookie

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
