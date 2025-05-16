// @ts-expect-error env exist in meta....
export const BASEURL = import.meta.env.PROD
  ? 'https://devsoko.ru/admin'
  : 'http://localhost:5173/admin'
