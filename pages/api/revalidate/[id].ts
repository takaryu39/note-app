// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating detail notes page...')
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/note/${id}`)
    revalidated = true
  } catch (error) {
    console.log(error)
  }

  res.status(200).json({ revalidated })
}
