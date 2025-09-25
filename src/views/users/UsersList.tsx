import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import { IUserWithDates } from 'src/types/User.ts'
import { getUsers } from 'src/dataProviders/users.ts'
import toast from 'react-hot-toast'
import { UsersListSmartTable } from 'src/components/tables/UsersListSmartTable.tsx'

const UsersList = () => {
  const [users, setUsers] = useState<IUserWithDates[]>([])

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data.users))
      .catch((err) => {
        toast.error('Произошла ошибка при загрузке данных')
        console.error(err)
      })
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Пользователи</strong>
          </CCardHeader>
          <CCardBody>
            <UsersListSmartTable users={users} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsersList
