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
import { ISocial } from 'src/types/Socials.ts'
import { CreateSocialLink } from 'src/dataProviders/restaurants.ts'

export const CreateSocialPopup: FC<{
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
  restaurant: IRestaurant
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ restaurant, setRestaurant, popup }) => {
  const [social, setSocial] = useState<ISocial>({
    id: 0,
    name: '',
    url: '',
    type: 'instagram',
  })
  const [open, setOpen] = popup

  const saveChanges = () => {
    CreateSocialLink(social, restaurant.id).then((res) =>
      setRestaurant((prevState) => ({
        ...prevState!,
        socials: [...prevState!.socials, res.data],
      })),
    ).then(()=>setOpen(false))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Добавить</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CFormSelect
            value={social.type}
            onChange={(e) => setSocial((p) => ({ ...p, type: e.target.value }))}
          >
            <option value={'instagram'}>Instagram</option>
          </CFormSelect>
          <CFormInput
            floatingLabel={'Название'}
            value={social.name}
            onChange={(e) => setSocial((p) => ({ ...p, name: e.target.value }))}
          />
          <CFormInput
            floatingLabel={'Ссылка'}
            value={social.url}
            onChange={(e) => setSocial((p) => ({ ...p, url: e.target.value }))}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color={'primary'} onClick={saveChanges}>Сохранить</CButton>
      </CModalFooter>
    </CModal>
  )
}
