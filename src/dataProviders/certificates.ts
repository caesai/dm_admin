import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { ICertificate } from 'src/types/Certificates.ts'
import { IPagination } from 'src/types/Common.ts'

export const getCertificates = async (props: IPagination, created_from?: string) => {
  return await axios.get<ICertificate>(`${BASEURL}/certificates/`, {
    params: {
      page: props.page,
      per_page: props.per_page,
      created_from: created_from,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
