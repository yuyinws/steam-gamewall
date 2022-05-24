import type { VercelRequest, VercelResponse } from '@vercel/node'
import { $fetch } from 'ohmyfetch'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { steamid } = request.query
  const { response: _response } = await $fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}&format=json`)
  response.status(200).send({
    response: _response,
  })
}
