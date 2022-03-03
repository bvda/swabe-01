import express from 'express'
import { Issuer } from 'openid-client';
import { generators } from 'openid-client';



const app = express()
const PORT = 3010

app.get('', async (req, res) => {

  const issuer = await Issuer.discover('http://localhost:3000');
  
  const { Client } = issuer;
  const code_verifier = generators.codeVerifier();
// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
// it should be httpOnly (not readable by javascript) and encrypted.

const code_challenge = generators.codeChallenge(code_verifier);
const client = new issuer.Client({
  client_id: 'foo',
  redirect_uris: ['https://httpbin.org/anything'],    
  response_types: ['code'],
})
  const url = client.authorizationUrl({
    scope: 'openid email profile',
    // resource: 'https://my.api.example.com/resource/32178',
    code_challenge,
    challenge_method: 'S256',
  });
  console.log(client, issuer)
  res.json({
    hello: url
  })
})

app.listen(PORT, () => {
  console.log(`Running 'oidc-client' on port ${PORT}`)
})