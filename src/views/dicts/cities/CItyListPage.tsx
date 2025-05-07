import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ICity } from 'src/types/City.ts'
import { GetCities } from 'src/dataProviders/cities.ts'
import { CreateCityPopup } from 'src/views/dicts/cities/popups/CreateCityPopup.tsx'
import { EditCityPopup } from 'src/views/dicts/cities/popups/EditCityPopup.tsx'

const CityListPage = () => {
  const [cities, setCities] = useState<ICity[]>([])
  const [signal, setSignal] = useState(0)

  const [createPopup, setCreatePopup] = useState(false)
  const [updatePopup, setUpdatePopup] = useState(false)

  const [curCity, setCurCity] = useState<ICity>()

  useEffect(() => {
    GetCities().then((res) => setCities(res.data))
  }, [signal])

  const editCity = (city: ICity) => {
    setCurCity(city)
    setUpdatePopup(true)
  }

  return (
    <>
      <CreateCityPopup sig={[signal, setSignal]} visible={[createPopup, setCreatePopup]} />
      {curCity && (
        <EditCityPopup
          sig={[signal, setSignal]}
          visible={[updatePopup, setUpdatePopup]}
          city={curCity}
        />
      )}
      <CCard>
        <CCardHeader>
          <div
            className={classNames(
              'd-flex',
              'flex-row',
              'justify-content-between',
              'align-items-center',
            )}
          >
            <strong>Города</strong>
            <CButton color={'success'} onClick={() => setCreatePopup(true)}>
              Создать
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableHeaderCell scope={'col'}>Название</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Пр. падеж</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Тэг</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Управление</CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {cities.map((city) => (
                <CTableRow key={city.name_english}>
                  <CTableDataCell>{city.name}</CTableDataCell>
                  <CTableDataCell>{city.name_dative}</CTableDataCell>
                  <CTableDataCell>{city.name_english}</CTableDataCell>
                  <CTableDataCell>
                    <CDropdown variant={'btn-group'} color={'info'}>
                      <CButton color={'info'} onClick={() => editCity(city)}>
                        Редактировать
                      </CButton>
                      <CDropdownToggle color="info" split />
                      <CDropdownMenu>
                        <CDropdownItem>Удалить</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow></CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CityListPage
