// @ts-expect-error env exist in meta....
export const BASEURL = import.meta.env.PROD
  ? 'https://backend.dreamteam.fm/admin'
  : 'http://192.168.0.40:5173/admin'
