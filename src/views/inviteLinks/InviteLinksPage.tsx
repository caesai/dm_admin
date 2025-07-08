import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { getCodes } from 'src/dataProviders/codes'
import { ICode } from 'src/types/Code'

export const MOCK_CODES: ICode[] = [
  {
    name: 'тургид',
    code: 'main_dt',
    text: null,
    restaurant_id: null,
  },
  {
    name: 'тургид',
    code: 'submain_dt',
    text: 'Здравствуйте!👋Добро пожаловать в личного консьержа от команды Dreamteam.',
    restaurant_id: 1,
  },
  {
    name: 'тургид',
    code: 'subsubmain_dt',
    text: '',
    restaurant_id: null,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: 'Здравствуйте!👋Добро пожаловать в личного консьержа от команды Dreamteam. Здравствуйте!👋Добро пожаловать в личного консьержа от команды Dreamteam.',
    restaurant_id: 2,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: 'Здравствуйте!👋Добро пожаловать в личного консьержа от ...',
    restaurant_id: null,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: '',
    restaurant_id: 3,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: '',
    restaurant_id: null,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: 'Здравствуйте!👋Добро пожаловать в личного консьержа от ...',
    restaurant_id: 1,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: null,
    restaurant_id: 1,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: 'Здравствуйте!👋Добро пожаловать в личного консьержа от ...',
    restaurant_id: 1,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: null,
    restaurant_id: 1,
  },
  {
    name: 'тургид',
    code: 'main_dt',
    text: 'Здравствуйте!👋Добро пожаловать в личного консьержа от ...',
    restaurant_id: 1,
  },
]

const InviteLinksPage = () => {
  const [links, setLinks] = useState<ICode[]>([])
  const [loading, setLoading] = useState(true)
  console.log('InviteLinks: ', links)

  useEffect(() => {
    getCodes()
      //.then((resp) => setLinks(resp.data))
      .then((resp) => setLinks(MOCK_CODES))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <CSpinner color={'primary'} />
  }

  return (
    <CCard>
      <CCardHeader>Invite Links Page</CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>Hello</CCardBody>
    </CCard>
  )
}

export default InviteLinksPage
