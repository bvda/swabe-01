process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import express from 'express'
import https from 'https';
import fs from 'fs';
import path from 'path';
import { Issuer, TokenSet, generators } from 'openid-client';

const app = express()

const PORT = 3010
const ISSUER_URL = 'https://127.0.0.1:3000/oidc'
const REDIRECT_URI = `https://127.0.0.1:${PORT}/callback`;

const options =  {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
};

const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);

async function main() {
  const issuer = await Issuer.discover(ISSUER_URL)
  const client = new issuer.Client({
    client_id: 'such_app',
    client_secret: 'such_secure',
    redirect_uris: [REDIRECT_URI],
    response_types: ['code', 'code id_token', 'id_token'],
    token_endpoint_auth_method: 'none',
    scope: 'openid offline_access'
  })
  
  const auth_url = client.authorizationUrl({
    scope: 'openid offline_access',
    prompt: 'consent',
    code_challenge,
    code_challenge_method: 'S256',
  });
  
  app.get('/pkce', async (req, res) => {
    res.json({ auth_url })
  })

  
  app.get('/callback', async (req, res) => {  
    const params = client.callbackParams(req);    
    res.json(params)
  })
  
https.createServer(options, app).listen(PORT, () => {
    console.log(`Running 'oidc-client' on port ${PORT}`)
  })
}
main()