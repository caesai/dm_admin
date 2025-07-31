import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { getMailingList } from 'src/dataProviders/mailing.ts'
import { IMailing } from 'src/types/Mailing.ts'
import DeleteMailingPopup from "src/views/notifications/NotificationPopups/DeleteMailingPopup.tsx";
import toast from "react-hot-toast";

const NotificationHistory = () => {
  const [MailingList, setMailingList] = useState<IMailing[]>([])
  const [currentMailingId, setCurrentMailingId] = useState<number | null>(null)

  const loadMailing = () => {
    getMailingList()
      .then((res) => {
      setMailingList(res.data)
    })
      .catch((error) => {
        toast.error("Ошибка при получении истории рассылки: " + error)
      })
  }
  useEffect(() => {
    loadMailing()
  }, [])
  return (
    <>
      <CCard>
        <CCardHeader>История рассылки</CCardHeader>
        <CCardBody>
          <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
            <CTableHead className="text-center">
              <CTableHeaderCell className="text-start">Текст рассылки</CTableHeaderCell>
              <CTableHeaderCell className="text-start">Показать</CTableHeaderCell>
              <CTableHeaderCell>Дата</CTableHeaderCell>
              <CTableHeaderCell>Количество получателей</CTableHeaderCell>
              <CTableHeaderCell>Удалить</CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {MailingList.map((mailing) => (
                <CTableRow className="text-center" key={mailing.id}>
                  <CTableDataCell className="text-start">{mailing.text}</CTableDataCell>
                  <CTableDataCell className="text-start">
                    <CButton color="primary">Показать</CButton>
                  </CTableDataCell>
                  <CTableDataCell>{mailing.created_at}</CTableDataCell>
                  <CTableDataCell>{mailing.sent_count}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => setCurrentMailingId(mailing.id)}>Удалить</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      {currentMailingId !== null && (
        <DeleteMailingPopup popup={[currentMailingId, setCurrentMailingId]} onUpdate={loadMailing} />
      )}
    </>
  )
}

export default NotificationHistory
