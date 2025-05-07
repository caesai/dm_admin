import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CAvatar,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { IPhotoCard } from 'src/types/Gallery.ts'
import { EditGalleryPopup } from 'src/views/restaurants/RestaurantPanels/Popups/EditGalleryPopup.tsx'
import { CreateGalleryPopup } from 'src/views/restaurants/RestaurantPanels/Popups/CreateGalleryPopup.tsx'

interface IGalleryPanel {
  restaurant: IRestaurant
  signal: [number, Dispatch<SetStateAction<number>>]
}

export const GalleryPanel = ({ restaurant, signal }: IGalleryPanel) => {
  const sortedGallery = useMemo(() => {
    return [...restaurant.gallery].sort((a, b) => a.order - b.order)
  }, [restaurant])

  const [update, setUpdate] = signal
  useEffect(() => {
    console.log(`PanelState: ${update}`)
  }, [update])

  const [editPopupOpen, setEditPopupOpen] = useState(false)
  const [createPopupOpen, setCreatePopupOpen] = useState(false)
  const [curObj, setCurObj] = useState<IPhotoCard>()

  const openEdit = (obj: IPhotoCard) => {
    setCurObj(obj)
    setEditPopupOpen(true)
  }

  return (
    <div className={'d-flex flex-column gap-2 mt-2'}>
      <EditGalleryPopup
        open={editPopupOpen}
        setOpen={setEditPopupOpen}
        card={curObj}
        signal={setUpdate}
      />
      <CreateGalleryPopup
        open={createPopupOpen}
        setOpen={setCreatePopupOpen}
        signal={setUpdate}
        restaurant_id={restaurant.id}
      />
      <div className={'d-flex'}>
        <CButton color={'success'} onClick={() => setCreatePopupOpen(true)}>
          Добавить
        </CButton>
      </div>
      <div className={'table-responsive'}>
        <CTable className={'align-middle table-hover mb-0 border mt-2'}>
          <CTableHead className={'p-2'}>
            <CTableHeaderCell className={classNames('bg-body-tertiary p-2')}>
              Превью
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('bg-body-tertiary text-center p-2')}>
              Категория
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('bg-body-tertiary text-center p-2')}>
              Порядок
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('bg-body-tertiary text-end p-2 pe-5')}>
              Действия
            </CTableHeaderCell>
          </CTableHead>
          <CTableBody>
            {sortedGallery.map((gal) => (
              <CTableRow key={gal.id}>
                <CTableDataCell>
                  <CAvatar size={'xl'} shape={'rounded-0'}>
                    <img
                      src={gal.url}
                      alt=""
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        verticalAlign: 'middle',
                        objectFit: 'cover',
                      }}
                    />
                  </CAvatar>
                </CTableDataCell>
                <CTableDataCell className={'text-center'}>{gal.category}</CTableDataCell>
                <CTableDataCell className={'text-center'}>{gal.order}</CTableDataCell>
                <CTableDataCell className={'text-end'}>
                  <CButton color={'primary'} onClick={() => openEdit(gal)}>
                    Редактировать
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
    // <CContainer fluid className={'mt-2'}>
    // </CContainer>
  )
}
