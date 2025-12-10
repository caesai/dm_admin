import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { IWorktime } from 'src/types/Worktime.ts'
import { CreateWorktime } from 'src/dataProviders/restaurants.ts'

export const CreateWorktimePopup: FC<{
  restaurant: IRestaurant
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  onUpdate: () => void
}> = ({ restaurant, popup, onUpdate }) => {
  const [open, setOpen] = popup

  const [worktime, setWorktime] = useState<IWorktime>({
    id: 0,
    weekday: 'пн',
    time_start: '00:00',
    time_end: '00:00',
  })

  const saveChanges = () => {
    CreateWorktime(worktime, restaurant.id).then(() => {
      onUpdate()
      setOpen(false)
    })
  }
  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Добавить</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CFormSelect
            floatingLabel={'День недели'}
            value={worktime.weekday}
            onChange={(e) => setWorktime((p) => ({ ...p, weekday: e.target.value }))}
          >
            <option value={'пн'}>Понедельник</option>
            <option value={'вт'}>Вторник</option>
            <option value={'ср'}>Среда</option>
            <option value={'чт'}>Четверг</option>
            <option value={'пт'}>Пятница</option>
            <option value={'сб'}>Суббота</option>
            <option value={'вс'}>Воскресенье</option>
          </CFormSelect>
          <CFormInput
            floatingLabel={'Начало'}
            value={worktime.time_start}
            onChange={(e) => setWorktime((p) => ({ ...p, time_start: e.target.value }))}
          />
          <CFormInput
            floatingLabel={'Конец'}
            value={worktime.time_end}
            onChange={(e) => setWorktime((p) => ({ ...p, time_end: e.target.value }))}
          />
        </CForm>
      </CModalBody>
      <CModalFooter className={'d-flex justify-content-between'}>
        <CButton color={'primary'} onClick={saveChanges}>
          Добавить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
