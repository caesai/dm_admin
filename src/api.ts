// @ts-ignore
export const DEV_MODE = import.meta.env.MODE === 'development'
export const BASEURL = DEV_MODE ? 'https://devsoko.ru/admin' : 'https://backend.dreamteam.fm/admin'

// @ts-ignore
export const INVITE_LINK = DEV_MODE
  ? 'https://t.me/dmdev1bot?startapp='
  : 'https://t.me/dt_concierge_bot?startapp='
