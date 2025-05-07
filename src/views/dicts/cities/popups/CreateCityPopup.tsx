import { Dispatch, SetStateAction, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { ICityCreate } from 'src/types/City.ts'
import { CreateCity } from 'src/dataProviders/cities.ts'

interface ICreateCityPopup {
  sig: [number, Dispatch<SetStateAction<number>>]
  visible: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const CreateCityPopup = ({ sig, visible }: ICreateCityPopup) => {
  const [_, setSignal] = sig
  const [isVisible, setIsVisible] = visible
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState<ICityCreate>({
    name: '',
    name_dative: '',
    name_english: '',
  })

  const createCity = () => {
    setIsLoading(true)
    CreateCity(form)
      .then(() => setSignal((prev) => prev + 1))
      .then(() => setIsVisible(false))
      .finally(() => setIsLoading(false))
  }

  return (
    <CModal visible={isVisible} onClose={() => setIsVisible(false)}>
      <CModalHeader>
        <CModalTitle>Добавить город</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type={'text'}
            label={'Название'}
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <CFormInput
            type={'text'}
            label={'Пр. падеж'}
            value={form.name_dative}
            onChange={(event) => setForm((prev) => ({ ...prev, name_dative: event.target.value }))}
          />
          <CFormInput
            type={'text'}
            label={'Сокращение на английском'}
            value={form.name_english}
            onChange={(event) => setForm((prev) => ({ ...prev, name_english: event.target.value }))}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setIsVisible(false)}>
          Отмена
        </CButton>
        <CLoadingButton color="primary" loading={isLoading} onClick={createCity}>
          Добавить
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}
