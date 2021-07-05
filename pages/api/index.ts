import { NextApiRequest, NextApiResponse } from 'next'
const corsProxy = require('@isomorphic-git/cors-proxy/middleware.js')

const options = {
  origin: process.env['PROXY_ALLOW_ORIGIN'],
  insecure_origins: (process.env['PROXY_INSECURE_ORIGINS'] || '').split(','),
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.url) {
    const nreq = { ...req, url: req.url.replace('/api', '') }
    return corsProxy(options)(nreq, res)
  }
  res.status(400).end('Bad Request')
}

export default handler
