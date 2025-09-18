// @ts-ignore
export const BASEURL =
  import.meta.env.MODE === 'development'
    ? 'https://devsoko.ru/admin'
    : 'https://backend.dreamteam.fm/admin'

// @ts-ignore
export const INVITE_LINK =
  import.meta.env.MODE === 'development'
    ? 'https://t.me/dmdev1bot?startapp='
    : 'https://t.me/dt_concierge_bot?startapp='
