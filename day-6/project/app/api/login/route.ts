// pages/api/login.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // Example hardcoded login check (you can replace this with real authentication logic)
  if (username === 'Ahmed' && password === '1234') {
    const user = { name: 'Admin', role: 'admin' };

    const response = NextResponse.json({ message: 'Login successful' });
    
    // Set the user information in the cookie (ensure to define other attributes like maxAge, sameSite, etc.)
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,  // Makes cookie accessible only by the server
      path: '/',       // Cookie will be available throughout the site
      maxAge: 60 * 60 * 24 * 7, // Set cookie expiration to 1 week
      sameSite: 'strict', // Helps prevent CSRF attacks
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    });

    return response;
  }

  // Invalid login response
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
