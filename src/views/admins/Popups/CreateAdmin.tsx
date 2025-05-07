import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { IAdmin } from 'src/types/Admin.ts'
import { createAdmin } from 'src/dataProviders/admins.ts'

export const CreateAdminPopup: FC<{
  setAdmins: Dispatch<SetStateAction<IAdmin[]>>
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ setAdmins, popup }) => {
  const [open, setOpen] = popup
  const [admin, setAdmin] = useState({
    login: '',
    password: '',
  })

  const saveChanges = () =>
    createAdmin(admin)
      .then((res) => setAdmins((p) => [...p, res.data]))
      .then(() => setOpen(false))

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Создать администратора</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'} validated={false}>
          <CFormInput
            id={'login'}
            floatingLabel={'Логин'}
            value={admin.login}
            onChange={(e) => setAdmin((p) => ({ ...p, login: e.target.value }))}
            required
          ></CFormInput>
          <CFormInput
            id={'password'}
            floatingLabel={'Пароль'}
            value={admin.password}
            onChange={(e) => setAdmin((p) => ({ ...p, password: e.target.value }))}
            required
          ></CFormInput>
          <label htmlFor="password">Минимум 8 символов</label>
          <CModalFooter className={'d-flex justify-content-between'}>
            <CButton color={'primary'} onClick={saveChanges}>
              Сохранить
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
