import type { NextApiRequest, NextApiResponse } from "next"
import add from "date-fns/add"
import format from "date-fns/format"

type Data = {
  word: string
  nextWordAt: string
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const now = add(new Date(), { days: 1 })
  const nextWordAt = `${format(now, "yyyy-MM-dd")}T00:00:00.000Z`

  // Write logic here to get the next word

  return res.status(200).json({ word: "smurf", nextWordAt })
}
