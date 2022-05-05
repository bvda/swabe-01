import express from 'express';
import { auth, requiresAuth } from  'express-openid-connect';
import dotenv from 'dotenv'

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const app = express();

app.use(auth(config));

app.get('', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

app.listen(3000, () => {
  console.log(`Running 'express-auth0' on port 3000` )
});