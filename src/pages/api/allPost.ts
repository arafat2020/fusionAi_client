// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse, NextApiRequest } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  prisma.art.findMany({
    take: 10
  }).then(async data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      msg:'Something Went Wrong',
      err:err
    })
  })

}
