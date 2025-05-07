import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
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
import { IRestaurant } from 'src/types/Restaurant.ts'
import { EditWorktime } from 'src/dataProviders/restaurants.ts'

export const EditWorktimePopup: FC<{
  worktime: IWorktime
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ worktime, setRestaurant, popup }) => {
  const [open, setOpen] = popup
  const [copy, setCopy] = useState<IWorktime>(worktime)

  useEffect(() => {
    setCopy(worktime)
  }, [worktime]);

  const saveChanges = () => {
    EditWorktime(copy)
      .then((res) =>
        setRestaurant((prevState) => ({
          ...prevState!,
          worktime: [...prevState!.worktime, res.data],
        })),
      )
      .then(() => setOpen(false))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Редактировать</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CFormSelect
            floatingLabel={'День недели'}
            value={copy.weekday}
            onChange={(e) => setCopy((p) => ({ ...p, weekday: e.target.value }))}
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
            value={copy.time_start}
            onChange={(e) => setCopy((p) => ({ ...p, time_start: e.target.value }))}
          />
          <CFormInput
            floatingLabel={'Конец'}
            value={copy.time_end}
            onChange={(e) => setCopy((p) => ({ ...p, time_end: e.target.value }))}
          />
        </CForm>
      </CModalBody>
      <CModalFooter className={'d-flex justify-content-between'}>
        <CButton color={'primary'} onClick={saveChanges}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
