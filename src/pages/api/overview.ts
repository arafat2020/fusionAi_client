import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from 'next'

const prisma = new PrismaClient()

export default async function overview(req: NextApiRequest, res: NextApiResponse) {
    try {
        const overview = await prisma.$transaction([
            prisma.artist.count(),
            prisma.art.count(),
            prisma.react.count(),
            prisma.comment.count(),
            prisma.favourite.count()
        ])
        res.send(overview)
    } catch (error) {
        res.status(500).send({
            msg: 'something went erong',
            err: error
        })
        throw new Error(error)

    }

}