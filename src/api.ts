// @ts-expect-error env exist in meta....
export const BASEURL = import.meta.env.PROD
  ? 'https://backend.dreamteam.fm/admin'
  : 'http://localhost:5173/admin'

// @ts-expect-error env exist in meta....
export const INVITE_LINK = import.meta.env.PROD
  ? 'https://t.me/dt_concierge_bot?start='
  : 'https://t.me/dmdev1bot?start='
