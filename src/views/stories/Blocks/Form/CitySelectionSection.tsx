import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { FC } from 'react'

interface CitySelectionSectionProps {
  selectedCities: number[]
  onCityToggle: (cityId: number) => void
}

export const CitySelectionSection: FC<CitySelectionSectionProps> = ({
  selectedCities,
  onCityToggle,
}) => {
  const cities = [
    { id: 1, name: 'Москва' },
    { id: 2, name: 'Санкт-Петербург' },
    { id: 3, name: 'Екатеринбург' },
  ]

  return (
    <CRow className="mb-3">
      <CAccordion className="p-0">
        <CAccordionItem>
          <CAccordionHeader className="d-flex">
            Выбор города
            <div className="ms-2">
              <CTooltip content="Текст тултипа">
                <CIcon icon={cilInfo} />
              </CTooltip>
            </div>
          </CAccordionHeader>
          <CAccordionBody>
            {cities.map((city, index) => (
              <CFormCheck
                key={city.id}
                label={city.name}
                className={index < cities.length - 1 ? 'py-2 border-bottom' : 'py-2'}
                checked={selectedCities.includes(city.id)}
                onChange={() => onCityToggle(city.id)}
              />
            ))}
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}
