import { useCallback, useEffect, useState, ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import {
  getUsersMailingList,
  addUsersMailing,
  deleteUsersMailing,
  getUserById,
} from 'src/dataProviders/users.ts'
import { IMailingUser } from 'src/types/Mailing.ts'

export const useMailingPanel = () => {
  const [users, setUsers] = useState<IMailingUser[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<IMailingUser | null>(null)
  const [currentId, setCurrentId] = useState<number>(0)

  const loadUsers = useCallback(() => {
    setCurrentId(0)
    setSelectedUser(null)
    getUsersMailingList({
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setUsers(res.data.users)
        setTotalItems(res.data.total!)
      })
      .catch(() => toast.error('Не удалось загрузить пользователей'))
  }, [currentPage, itemsPerPage])

  const sendMailing = () => {
    if (!selectedUser) return

    addUsersMailing(selectedUser.id)
      .then(() => {
        toast('Вы включили рассылку для пользователя')
        setSelectedUser((prev) => {
          if (!prev) return prev

          return {
            ...prev,
            mailing_enabled: !prev.mailing_enabled,
          }
        })
      })
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => loadUsers())
  }

  const deleteMailing = () => {
    if (!selectedUser) return

    deleteUsersMailing(selectedUser.id)
      .then(() => toast('Вы отключили рассылку у пользователя'))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => loadUsers())
  }

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value)
    setCurrentId(id)
  }

  const searchUser = () => {
    getUserById(currentId)
      .then((res) => setSelectedUser(res.data))
      .catch(() => {
        toast.error('Не удалось найти пользователя')
        setSelectedUser(null)
      })
  }

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  return {
    users,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    selectedUser,
    currentId,
    handleChangeId,
    searchUser,
    sendMailing,
    deleteMailing,
  }
}
