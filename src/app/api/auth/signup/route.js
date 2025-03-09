import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Connect to database
    const connection = await connectDB();

    // Check if the user already exists
    const [existingUsers] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      connection.end();
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    connection.end();

    return NextResponse.json({ message: "Signup successful!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
