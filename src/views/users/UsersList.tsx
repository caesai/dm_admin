import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import { IUserWithDates } from 'src/types/User.ts'
import { getUsers } from 'src/dataProviders/users.ts'
import toast from 'react-hot-toast'
import { UsersListSmartTable } from 'src/components/tables/UsersListSmartTable.tsx'

const UsersList = () => {
  const [users, setUsers] = useState<IUserWithDates[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    getUsers(currentPage, itemsPerPage)
      .then((res) => {
        setUsers(res.data.users)
        setTotalItems(res.data.total!)
      })
      .catch((err) => {
        toast.error('Произошла ошибка при загрузке данных')
        console.error(err)
      })
  }, [itemsPerPage, currentPage])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Пользователи</strong>
          </CCardHeader>
          <CCardBody>
            <UsersListSmartTable
              users={users}
              tableConfig={{
                currentPage,
                itemsPerPage,
                setCurrentPage,
                setItemsPerPage,
                totalItems,
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsersList
