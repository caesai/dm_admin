import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CSpinner,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IChef } from 'src/types/Chef.ts'
import { GetChefsList } from 'src/dataProviders/chefs.ts'
import { EditChefPopup } from 'src/views/chefs/EditChefPopup.tsx'
import { CreateChefPopup } from 'src/views/chefs/CreateChefPopup.tsx'

const ChefsPage = () => {
  const [chefs, setChefs] = useState<IChef[]>([])
  const [loading, setLoading] = useState(true)

  const [editPopup, setEditPopup] = useState(false)
  const [createPopup, setCreatePopup] = useState(false)
  const [curItem, setCurItem] = useState<IChef>()

  useEffect(() => {
    setLoading(true)
    GetChefsList()
      .then((d) => setChefs(d.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <CSpinner color={'primary'} />
  }

  return (
    <CCard>
      {curItem && (
        <EditChefPopup chef={curItem} setChefs={setChefs} popup={[editPopup, setEditPopup]} />
      )}
      <CreateChefPopup setChefs={setChefs} popup={[createPopup, setCreatePopup]} />
      <CCardHeader>
        <div
          className={classNames(
            'd-flex',
            'flex-row',
            'justify-content-between',
            'align-items-center',
          )}
        >
          <strong>Шефы</strong>
          <CButton color={'success'} onClick={() => setCreatePopup(true)}>
            Добавить
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
        {chefs.map((c: IChef) => (
          <CCard style={{ width: '18rem' }}>
            <CCardImage src={c.photo_url} />
            <CCardBody>
              <CCardTitle>{c.name}</CCardTitle>
              <div>
                <CButton
                  color={'primary'}
                  onClick={() => {
                    setCurItem(c)
                    setEditPopup(true)
                  }}
                >
                  Редактировать
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        ))}
      </CCardBody>
    </CCard>
  )
}

export default ChefsPage
