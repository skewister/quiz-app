import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect('/login');
  }

  else {
    console.log(token);
  }

  try {
    jwt.verify(token, 'secret'); // Assurez-vous d'utiliser la même clé secrète que lors de la génération du token
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect('/login');
  }
}