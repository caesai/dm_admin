import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { IWorktime } from 'src/types/Worktime.ts'
import { RemoveWorktime } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'
import { CreateWorktimePopup } from 'src/views/restaurants/RestaurantPanels/Popups/CreateWorktimePopup.tsx'
import { EditWorktimePopup } from 'src/views/restaurants/RestaurantPanels/Popups/EditWorktimePopup.tsx'

export const WorkhoursPanel: FC<{
  restaurant: IRestaurant
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
  signal: [number, Dispatch<SetStateAction<number>>]
}> = ({ restaurant, setRestaurant }) => {
  const [createPopup, setCreatePopup] = useState(false)
  const [editPopup, setEditPopup] = useState(false)
  const [cur, setCur] = useState<IWorktime>()

  const removeWorkhour = (wt: IWorktime) => {
    if (!restaurant) {
      return
    }
    RemoveWorktime(wt)
      .then(() =>
        setRestaurant((prev) => ({
          ...prev!,
          worktime: prev!.worktime.filter((v) => v.id !== wt.id),
        })),
      )
      .then(() => toast('Запись удалена'))
  }

  return (
    <div className={'table-responsive mt-2'}>
      <CreateWorktimePopup
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        popup={[createPopup, setCreatePopup]}
      />
      {cur && (
        <EditWorktimePopup
          worktime={cur}
          setRestaurant={setRestaurant}
          popup={[editPopup, setEditPopup]}
        />
      )}
      <div>
        <CButton color={'primary'} onClick={() => setCreatePopup(true)}>
          Добавить
        </CButton>
      </div>
      <CTable className={'align-middle table-hover mb-0 border mt-2'}>
        <CTableHead>
          <CTableHeaderCell className={'bg-body-tertiary p-2'}>День недели</CTableHeaderCell>
          <CTableHeaderCell className={'bg-body-tertiary text-center p-2'}>Начало</CTableHeaderCell>
          <CTableHeaderCell className={'bg-body-tertiary text-center p-2'}>Конец</CTableHeaderCell>
          <CTableHeaderCell className={'bg-body-tertiary text-end p-2'}></CTableHeaderCell>
        </CTableHead>
        <CTableBody>
          {restaurant.worktime.map((wt) => (
            <CTableRow key={wt.id}>
              <CTableDataCell className={'p-2'}>{wt.weekday}</CTableDataCell>
              <CTableDataCell className={'text-center p-2'}>{wt.time_start}</CTableDataCell>
              <CTableDataCell className={'text-center p-2'}>{wt.time_end}</CTableDataCell>
              <CTableDataCell className={'text-end p-2 d-flex justify-content-end gap-2'}>
                <CButton
                  color={'primary'}
                  onClick={() => {
                    setCur(wt)
                    setEditPopup(true)
                  }}
                >
                  Редактировать
                </CButton>
                <CButton color={'danger'} onClick={() => removeWorkhour(wt)}>
                  -
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}
