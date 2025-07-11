// @ts-expect-error env exist in meta....
export const BASEURL = import.meta.env.PROD
  ? 'https://backend.dreamteam.fm/admin'
  : 'http://localhost:5173/admin'
