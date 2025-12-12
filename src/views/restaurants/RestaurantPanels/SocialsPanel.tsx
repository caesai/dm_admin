import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { CreateSocialPopup } from 'src/views/restaurants/RestaurantPanels/Popups/CreateSocialPopup.tsx'
import { ISocial } from 'src/types/Socials.ts'
import { DeleteSocialLink } from 'src/dataProviders/restaurants.ts'

export const SocialsPanel: FC<{
  restaurant: IRestaurant
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
}> = ({ restaurant, setRestaurant }) => {
  const [createPopup, setCreatePopup] = useState(false)

  const deleteSocialLink = (link: ISocial) => {
    DeleteSocialLink(link, restaurant.id).then(() =>
      setRestaurant((prev) => ({
        ...prev!,
        socials: [...prev!.socials.filter((v) => v.id !== link.id)],
      })),
    )
  }
  return (
    <div className={'table-responsive mt-2'}>
      <CreateSocialPopup
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        popup={[createPopup, setCreatePopup]}
      />
      <div>
        <CButton color={'primary'} onClick={() => setCreatePopup(true)}>
          Добавить
        </CButton>
      </div>
      <CTable className={'align-middle table-hover mb-0 border mt-2'}>
        <CTableHead>
          <CTableHeaderCell className={'bg-body-tertiary p-2'}>Сервис</CTableHeaderCell>
          <CTableHeaderCell className={'bg-body-tertiary text-center p-2'}>
            Название
          </CTableHeaderCell>
          <CTableHeaderCell className={'bg-body-tertiary text-center p-2'}>Ссылка</CTableHeaderCell>
          <CTableHeaderCell className={'bg-body-tertiary text-end p-2'}></CTableHeaderCell>
        </CTableHead>
        <CTableBody>
          {restaurant.socials.map((social) => (
            <CTableRow key={social.id}>
              <CTableDataCell className={'p-2'}>{social.type}</CTableDataCell>
              <CTableDataCell className={'text-center p-2'}>{social.name}</CTableDataCell>
              <CTableDataCell className={'text-center p-2'}>{social.url}</CTableDataCell>
              <CTableDataCell className={'text-end p-2 d-flex justify-content-end gap-2'}>
                <CButton color={'danger'} onClick={() => deleteSocialLink(social)}>
                  -
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}
