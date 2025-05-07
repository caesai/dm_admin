// @ts-expect-error env exist in meta....
export const BASEURL = !import.meta.env.PROD
  ? 'https://devsoko.ru/admin'
  : 'https://localhost:8000/admin'
