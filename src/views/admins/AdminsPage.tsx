import { useEffect, useState } from 'react'
import { IAdmin } from 'src/types/Admin.ts'
import {
  changeActiveAdmin,
  deleteAdmin,
  getAdmins,
  resetAdminPassword,
} from 'src/dataProviders/admins.ts'
// @ts-expect-error its ok
import css from '../style/layout.module.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import toast from 'react-hot-toast'
import { CreateAdminPopup } from 'src/views/admins/Popups/CreateAdmin.tsx'

const AdminsPage = () => {
  const [admins, setAdmins] = useState<IAdmin[]>([])
  const [resetPassword, setResetPassword] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin>()
  const [createPopup, setCreatePopup] = useState(false)

  const [newPassword, setNewPassword] = useState('')

  const updateAdminList = () => {
    getAdmins().then((d) => setAdmins(d.data))
  }

  useEffect(() => {
    updateAdminList()
  }, [])

  const handleResetPassword = (admin_id: number, new_password: string) => {
    resetAdminPassword(admin_id, new_password).then(() => {
      updateAdminList()
      toast('Пароль обновлен')
      setNewPassword('')
      setResetPassword(false)
    })
  }

  const delAdmin = (id: number) => {
    deleteAdmin(id).then(() => setAdmins((p) => p.filter((v) => v.id !== id)))
  }

  const activeAdmin = (id: number, is_active: boolean) => {
    changeActiveAdmin(id, is_active).then(() =>
      setAdmins((p) => [
        ...p.filter((v) => v.id !== id),
        {
          ...p.find((v) => v.id === id)!,
          is_active: is_active,
        },
      ]),
    )
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={resetPassword}
        onClose={() => setResetPassword(false)}
        aria-labelledby="ResetPassword"
      >
        <CModalHeader>
          <CModalTitle id="ResetPassword">Сброс пароля</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type={'text'}
              label={'Новый пароль'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setResetPassword(false)}>
            Закрыть
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              selectedAdmin ? handleResetPassword(selectedAdmin.id, newPassword) : toast('Ошибка')
            }
          >
            Обновить
          </CButton>
        </CModalFooter>
      </CModal>
      <CreateAdminPopup setAdmins={setAdmins} popup={[createPopup, setCreatePopup]} />
      {/*=======================================================*/}
      <CCol>
        <CCard>
          <CCardBody>
            <CButton color={'primary'} onClick={() => setCreatePopup(true)}>
              Создать
            </CButton>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <strong>Администраторы</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableHeaderCell scope={'col'}>Логин</CTableHeaderCell>
                <CTableHeaderCell scope={'col'}>Активен</CTableHeaderCell>
                <CTableHeaderCell scope={'col'}>Пользователи</CTableHeaderCell>
                <CTableHeaderCell scope={'col'}>Действия</CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                {admins.map((admin) => (
                  <CTableRow key={admin.id}>
                    <CTableDataCell>{admin.login}</CTableDataCell>
                    <CTableDataCell>{admin.is_active ? 'Да' : 'Нет'}</CTableDataCell>
                    <CTableDataCell>{admin.user?.length}</CTableDataCell>
                    <CTableDataCell>
                      <div className={css.fr8}>
                        <CButton
                          color={'info'}
                          onClick={() => {
                            setResetPassword(true)
                            setSelectedAdmin(admin)
                          }}
                        >
                          Сбросить пароль
                        </CButton>
                        <CButton
                          color={'warning'}
                          onClick={() => activeAdmin(admin.id, !admin.is_active)}
                        >
                          Деактивировать
                        </CButton>
                        <CButton color={'danger'} onClick={() => delAdmin(admin.id)}>
                          Удалить
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default AdminsPage
