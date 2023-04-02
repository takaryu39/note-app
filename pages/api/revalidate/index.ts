// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating notes page...')
  let revalidated = false
  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch (error) {
    console.log(error)
  }

  res.status(200).json({ revalidated })
}
