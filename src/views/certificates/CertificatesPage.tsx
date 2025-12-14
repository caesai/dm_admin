import { FC, useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CSmartTable } from '@coreui/react-pro'
import classNames from 'classnames'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import { getCertificates } from 'src/dataProviders/certificates.ts'
import toast from 'react-hot-toast'
import { CertificateData, ICertificate } from 'src/types/Certificates.ts'
import { TablePopup } from 'src/components/TablePopup.tsx'

const CertificatesPage: FC = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([])
  const [currentCertificate, setCertificate] = useState<ICertificate | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const filterDate = '2025-12-03T12:00:00'

  const loadCertificates = async () => {
    getCertificates(
      {
        page: currentPage,
        per_page: itemsPerPage,
      },
      filterDate,
    )
      .then((res) => {
        setCertificates(res.data.certificates)
        setTotalItems(res.data.total!)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  useEffect(() => {
    void loadCertificates()
  }, [currentPage, itemsPerPage])

  const cols = [
    {
      key: 'customer_id',
      label: 'Клиент',
      _props: { scope: 'col' },
    },
    {
      key: 'value',
      label: 'Номинал',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      label: 'Статус',
      _props: { scope: 'col' },
    },
    {
      key: 'payment_id',
      label: 'ID платежа',
      _props: { scope: 'col' },
    },
    {
      key: 'recipient_id',
      label: 'ID получателя',
      _props: { scope: 'col' },
    },
    {
      key: 'recipient_name',
      label: 'Получатель',
      _props: { scope: 'col' },
    },
    {
      key: 'phone_number',
      label: 'Номер',
      _props: { scope: 'col' },
    },
    {
      key: 'message',
      label: 'Сообщение',
      _props: { scope: 'col' },
    },
    {
      key: 'expired_at',
      label: 'Действителен до',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <TablePopup data={[currentCertificate, setCertificate]} title={'Сертификат'} />
      <CCard className={classNames('rounded', 'border')}>
        <CCardHeader>
          <strong>Сертификаты</strong>
        </CCardHeader>
        <CCardBody className={'py-0'}>
          <CSmartTable
            columns={cols}
            items={certificates}
            clickableRows
            itemsPerPageSelect
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[10, 20, 50, 100]}
            pagination
            paginationProps={{
              pages: Math.ceil(totalItems / itemsPerPage),
              activePage: currentPage,
              onActivePageChange: setCurrentPage,
            }}
            tableHeadProps={{
              className: 'align-middle',
            }}
            tableProps={{
              striped: true,
              hover: true,
              className: classNames('align-middle', 'text-center'),
            }}
            onRowClick={(item: Item) => setCertificate(item as ICertificate)}
            scopedColumns={{
              expired_at: (item: Item) => <td>{new Date(item.expired_at).toLocaleDateString()}</td>,
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default CertificatesPage
