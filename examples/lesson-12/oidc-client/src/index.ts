import express from 'express'
import { Issuer, TokenSet, generators } from 'openid-client';

const app = express()
const PORT = 3010
const REDIRECT_URI = 'http://127.0.0.1:3010/callback';

const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);
console.log({code_verifier, code_challenge})

app.get('', async (req, res) => {

  // store the code_verifier in your framework's session mechanism, if it is a cookie based solution
  // it should be httpOnly (not readable by javascript) and encrypted.
  const issuer = await Issuer.discover('http://127.0.0.1:3000')
  const client = new issuer.Client({
    client_id: 'foo',
    redirect_uris: [REDIRECT_URI],    
    response_types: ['code'],
    token_endpoint_auth_method: 'none'
  })

  const auth_url = client.authorizationUrl({
    scope: 'openid email profile',
    // nonce: 'foo',
    // resource: 'https://my.api.example.com/resource/32178',
    // code_challenge,
    code_challenge: "_drLS7o5FwkfUiBhlq2hwJnK_SC6yE7sKOde5O1fdzk",
    code_challenge_method: 'S256',
  });
  res.json(auth_url)
})

app.get('/callback', async (req, res) => {  
  const issuer = await Issuer.discover('http://127.0.0.1:3000')
  const client = new issuer.Client({
    client_id: 'foo',
    redirect_uris: [REDIRECT_URI],    
    // response_types: ['authorization_code'],
    token_endpoint_auth_method: 'none'
  })
  
  const params = client.callbackParams(req);
  const token_set: TokenSet = await client.callback('http://localhost:3010', params, { code_verifier: "pIUgx4tiqFpaOUz0HMc_QbIyQlL901w8mRmkrmhEJ_E" });
  
  res.json({
    token_set,
  })
})

app.listen(PORT, () => {
  console.log(`Running 'oidc-client' on port ${PORT}`)
})