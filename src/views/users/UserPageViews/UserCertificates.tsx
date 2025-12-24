import { CertificateData } from 'src/types/Certificates.ts'
import { CCard, CCardBody, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { useState, useEffect, FC, useCallback } from 'react'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { formatDateTime } from 'src/utils.tsx'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { getCertificates } from 'src/dataProviders/certificates.ts'

export const UserCertificates: FC<{
  user_id: number
}> = ({ user_id }) => {
  const [certificates, setCertificates] = useState<CertificateData[]>([])
  const [currentCertificate, setCurrentCertificate] = useState<CertificateData | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const loadCertificates = useCallback(() => {
    getCertificates({
      user_id: user_id,
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setCertificates(res.data.certificates)
        setTotalItems(res.data.total!)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }, [user_id, currentPage, itemsPerPage])

  useEffect(() => {
    void loadCertificates()
  }, [loadCertificates])

  const cols = [
    {
      key: 'certificate_type',
      label: 'Тип',
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
      key: 'recipient_name',
      label: 'Получатель',
      _props: { scope: 'col' },
    },
    {
      key: 'expired_at',
      label: 'Действителен до',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      label: 'Дата создания',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <TablePopup data={[currentCertificate, setCurrentCertificate]} title={'Сертификат'} />
      {certificates.length === 0 ? (
        <CCard>
          <CCardBody>У пользователя нет сертификатов</CCardBody>
        </CCard>
      ) : (
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
            className: classNames('text-center', 'align-middle'),
          }}
          onRowClick={(item: Item) => setCurrentCertificate(item as CertificateData)}
          scopedColumns={{
            expired_at: (item: Item) => (
              <td>{item.expired_at ? new Date(item.expired_at).toLocaleDateString() : '-'}</td>
            ),
            created_at: (item: Item) => <td>{formatDateTime(item.created_at)}</td>,
          }}
        />
      )}
    </>
  )
}
