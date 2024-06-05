// api/login.js

import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const user = await query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (user.length > 0) {
      res.status(200).json({ message: 'Authentification réussie' });
    } else {
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'authentification' });
  }
}
