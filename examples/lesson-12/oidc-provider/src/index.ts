import { Configuration, Provider } from 'oidc-provider'

const configuration: Configuration = {
  clients: [{
    client_id: 'foo',
    response_types: ['code'],
    grant_types: ['authorization_code'],
    token_endpoint_auth_method: 'none',
    redirect_uris: ['http://127.0.0.1:3010/callback']
  }],
  pkce: {
    methods: ['plain', 'S256']
  },
  jwks: {
      keys: [
          {
              "p": "3k1agsvoJQmBO4nj5ByTaSQP8fhvos8ilJrx6FkHPFGIMMSSr2pGp2TtQrrpHYJYiIybJTtwKevKHipwrOIR_IY-12WJPyZlsJlGkXeGpwXIq9VoU_M5unzn-ipe-fz2ghCL80lFmoIFx5HefTGvgIlR-Q5tMVOMR28mTDQkpls",
              "kty": "RSA",
              "q": "pHTOZNxeRylcDUPylpiGwrXmYkxFGHTR7McMETJ7oz3OuRmS_hJmuU--VmhdUh9JUn9xCXBuEXuCEelUS1H4nViSzGuLJsP4eUeRvxZwTg8ukS87LSKJSQrDPsQS8-IfGrFzZKxRGiBvrOYHaf8UKIH0hXjeBpjPt1X2oIKI_-s",
              "d":  "JG8KTLW71L3YoyK9KIWsIuaCISLcALVNV3GMkX4FsMzKB3--MxHbXBhSSoiwl24OFDreNthwurviQDuBg2x4Z1aGPrFELhhhZikn3GRc3Be7YTS4VDSpa1FABtJhp3AADnFwZLcAzn_XJgB-O7OZGtQAqgN_Xxb7h46Q7bHx3NyRbuoCLV81y6mwq-XZ_emhc5JTFLyPhtz-0iUKWBys0jgbJ9FI-bPTuI7t9CdjY2oSpZmvfzRsLs4BqA5ikynTlACzRJcaQl4SJ1I9gOUCn5WW5kGHun936fB4S8pGmSMqmcCNQOZFXgf_lhkZ-2EcuTR9-q1M57egn6CHCKyZQQ",
              "e": "AQAB",
              "use": "sig",
              "kid": "Rx4FYjNmISVWfeNyoP_59sesJ-RKQbYJJK9bwU01agk",
              "qi": "ZvfemoByhJzhb7JrTuFsE5KmN-_weVPMAqJxRBBH3OzWI9facLThap7J9CzNtgIXy1YMWZoet2K33ein7P3RyxRSM-TT7IJQ21keLbZvPMOifpuMTYwO9Mr6cielJZzpC1mz7kbo5yXYAM7PnhFJEAkBIx_c0SPekwsFN36R0wg",
              "dp": "NzK747hf5zpp9W-yv4R88eF7eBi5F5MZQg8LPCdHDaotB_b3eUkJTC1aYHRqx-ICu702FNOicTZUFJNzMOpdjveCiRd0MdMF8wjMJfio3bYo8snlwtqlHfI_47U7qhUu3HLhXUJ3XvskFj7ZIPsCWgc-7HmxkUrujRpDRy63Xvs",
              "alg": "RS256",
              "dq": "Etr5lwLVJF-PmE3EEJQoT0a_xWFtQqKSNw2TSp15I3xAqWRPQCYn9PM5pXqNyI6hv32xHh3v4L1Can9QFNqvIIs5OYrTB3zMjkswYLJX6fs_oZHCvSgKiX9cZ2PfsGqqmkriKha_rbkuVKqDCxod248a0_rJqgP3PNP0VO7iekU",
              "n": "js78QqJOEBJVREcMLR5yx7Iss-OJ-eVEiyEiGSZThNCj9GQJmN2t5tLmUjwwgdEMh10g2mAlh6o2U0Hs4B9LBV-A7_JTSDcco849VDbFdSs67lz97o-FBY2GXte1bsEn6EKdnSSWAnWszC6cPImBUsHzuIfcRepcFrE_ZD08vF5Uoj48CsbWr03q0ZzBUXPSoyU4sbcAZrA-fbvHCUqatGgFjIQBb-O5FjYcAJIBEU1uhIUIl1mhHjStWlK6fjbMysvfLpMIeslJkBH1Ofnzb_pG_5-Nw1ClmmpWhCowETWENoglwu6_ert7TGzi2XpKpCi3mF6wCdNtHsq29bFaiQ"
          }
      ]
  }
}

const oidc = new Provider('http://127.0.0.1:3000', configuration)
oidc.listen(3000, () => {
  console.log(`Running 'oidc-provider' running on port 3000`)
})
