import express from 'express'
import { Issuer, TokenSet, generators, custom } from 'openid-client';

const app = express()

const PORT = 3010
const REDIRECT_URI = 'http: //127.0.0.1:3010/callback';

const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);

async function main() {
  const issuer = await Issuer.discover('http://127.0.0.1:3000')
  const client = new issuer.Client({
    client_id: 'foo',
    redirect_uris: [REDIRECT_URI],    
    response_types: ['code'],
    token_endpoint_auth_method: 'none',
  })
  
  const auth_url = client.authorizationUrl({
    scope: 'openid',
    code_challenge,
    code_challenge_method: 'S256',
  });
  
  app.get('', async (req, res) => {
    res.json(auth_url)
  })
  
  app.get('/callback', async (req, res) => {  
    const params = client.callbackParams(req);
    const token_set: TokenSet = await client.callback('http://127.0.0.1:3010/callback', params, { code_verifier });
    
    res.json({
      token_set,
    })
  })
  
  app.listen(PORT, () => {
    console.log(`Running 'oidc-client' on port ${PORT}`)
  })
}
main()