import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { ICertificate } from 'src/types/Certificates.ts'
import { IPagination } from 'src/types/Common.ts'

interface ICertificateProps extends IPagination {
  user_id?: number
  created_from?: string
}

export const getCertificates = async (props: ICertificateProps) => {
  return await axios.get<ICertificate>(`${BASEURL}/certificates/`, {
    params: {
      page: props.page,
      per_page: props.per_page,
      customer_id: props.user_id,
      created_from: props.created_from,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
