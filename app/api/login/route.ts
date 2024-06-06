import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simulation d'une base de données en mémoire
const users = [
  { id: 1, email: 'user@example.com', password: bcrypt.hashSync('password123', 10) }
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}
