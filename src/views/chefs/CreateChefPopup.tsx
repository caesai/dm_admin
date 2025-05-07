import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IChef } from 'src/types/Chef.ts'
import {
  CButton,
  CFormInput,
  CFormTextarea,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { CreateChef } from 'src/dataProviders/chefs.ts'

export const CreateChefPopup: FC<{
  setChefs: Dispatch<SetStateAction<IChef[]>>
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ setChefs, popup }) => {
  const [open, setOpen] = popup
  const [chef, setChef] = useState<IChef>({
    id: 0,
    name: '',
    about: '',
    photo_url: '',
  })

  const handleChangeFile = async (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setChef((prev) => ({ ...prev, photo_url: d.data.url })))
  }

  const saveChanges = async () => {
    CreateChef(chef)
      .then((res) => setChefs((prev) => [...prev, res.data]))
      .then(() => setOpen(false))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Добавить</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CImage
          src={chef.photo_url}
          className={'w-100 h-auto bg-dark bg-opacity-50'}
          style={{ aspectRatio: '1/1', objectFit: 'cover', verticalAlign: 'middle' }}
        />
        <CFormInput
          floatingLabel={'Имя'}
          value={chef.name}
          onChange={(e) => setChef((p) => ({ ...p, name: e.target.value }))}
        />
        <CFormTextarea
          floatingLabel={'О шефе'}
          value={chef.about}
          style={{ height: '12rem' }}
          onChange={(e) => setChef((p) => ({ ...p, about: e.target.value }))}
        ></CFormTextarea>
        <CFormInput
          type={'file'}
          label={'Загрузка фото'}
          accept={'image/png, image/jpeg, image/jpg'}
          onChange={(e) => handleChangeFile(e.target.files)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color={'primary'} onClick={saveChanges}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
