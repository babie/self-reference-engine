import { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const corsProxy = require('@isomorphic-git/cors-proxy/middleware.js')

const options = {
  origin: process.env['PROXY_ALLOW_ORIGIN'],
  insecure_origins: (process.env['PROXY_INSECURE_ORIGINS'] || '').split(','),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (req: NextApiRequest, res: NextApiResponse): any => {
  if (req.url) {
    const nreq = { ...req, url: req.url.replace('/api', '') }
    return corsProxy(options)(nreq, res)
  }
  res.status(400).end('Bad Request')
}

export default handler
