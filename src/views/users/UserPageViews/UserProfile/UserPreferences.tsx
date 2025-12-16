import { IUserPreferences } from 'src/types/User.ts'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { useMemo } from 'react'

interface Props {
  preferences: IUserPreferences
}

export const UserPreferences = ({ preferences }: Props) => {
  const preferencesList = preferences.preferences
  const categoryMap = preferencesList.reduce(
    (acc, p) => {
      acc[p.category] = p.choices || []
      return acc
    },
    {} as Record<string, string[]>,
  )
  const moodPreferences = categoryMap['MOOD'] || []
  const menuPreferences = categoryMap['MENU'] || []
  const eventsPreferences = categoryMap['EVENT_FORMATS'] || []

  const maxLength = Math.max(
    moodPreferences.length,
    menuPreferences.length,
    eventsPreferences.length,
  )

  const isEmptyPreferences = useMemo(() => {
    return (
      moodPreferences.length === 0 && menuPreferences.length === 0 && eventsPreferences.length === 0
    )
  }, [moodPreferences, menuPreferences, eventsPreferences])

  return (
    <>
      {!isEmptyPreferences && (
        <CCard className="border h-100">
          <CCardHeader>
            <CCardTitle className="mb-0">Предпочтения</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Настроение</CTableHeaderCell>
                  <CTableHeaderCell>Меню</CTableHeaderCell>
                  <CTableHeaderCell>Форматы</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Array.from({ length: maxLength }).map((_, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{moodPreferences[index] || null}</CTableDataCell>
                    <CTableDataCell>{menuPreferences[index] || null}</CTableDataCell>
                    <CTableDataCell>{eventsPreferences[index] || null}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      )}
    </>
  )
}
