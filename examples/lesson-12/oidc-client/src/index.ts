import express from 'express'
import https from 'https';
import fs from 'fs';
import path from 'path';
import { Issuer, TokenSet, generators } from 'openid-client';

const app = express()

const PORT = 3010
const ISSUER_URL = 'http://127.0.0.1:3000'
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
    client_id: 'code_pkce_with_refresh',
    redirect_uris: [REDIRECT_URI],    
    response_types: ['code'],
    token_endpoint_auth_method: 'none',
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
    const token_set: TokenSet = await client.callback(REDIRECT_URI, params, { code_verifier });
    
    res.json({
      token_set,
    })
  })
  
https.createServer(options, app).listen(PORT, () => {
    console.log(`Running 'oidc-client' on port ${PORT}`)
  })
}
main()