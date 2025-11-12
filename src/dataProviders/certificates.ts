import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { ICertificate } from 'src/types/Certificates.ts'

type getCertificatesProps = {
  page: number
  per_page: number
}

export const getCertificates = async (props: getCertificatesProps) => {
  return await axios.get<ICertificate>(`${BASEURL}/certificates/`, {
    params: {
      page: props.page,
      per_page: props.per_page,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
