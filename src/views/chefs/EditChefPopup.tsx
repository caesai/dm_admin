import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
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
import { UpdateChef } from 'src/dataProviders/chefs.ts'

export const EditChefPopup: FC<{
  chef: IChef
  setChefs: Dispatch<SetStateAction<IChef[]>>
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ chef, popup }) => {
  const [copy, setCopy] = useState<IChef>(chef)
  const [open, setOpen] = popup

  useEffect(() => {
    setCopy(chef)
  }, [chef])

  const handleChangeFile = async (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setCopy((prev) => ({ ...prev, photo_url: d.data.url })))
  }

  const saveChanges = async () => {
    UpdateChef(copy.id, copy).then(() => setOpen(false))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Редактировать</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CImage
          src={copy.photo_url}
          className={'w-100 h-auto bg-dark bg-opacity-50'}
          style={{ aspectRatio: '1/1', objectFit: 'cover', verticalAlign: 'middle' }}
        />
        <CFormInput
          floatingLabel={'Имя'}
          value={copy.name}
          onChange={(e) => setCopy((p) => ({ ...p, name: e.target.value }))}
        />
        <CFormTextarea
          floatingLabel={'О шефе'}
          value={copy.about}
          style={{ height: '12rem' }}
          onChange={(e) => setCopy((p) => ({ ...p, about: e.target.value }))}
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
