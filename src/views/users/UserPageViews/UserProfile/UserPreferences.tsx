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

interface Props {
  preferences: IUserPreferences
}

export const UserPreferences = ({ preferences }: Props) => {
  const preferencesList = preferences.preferences
  const moodPreferences = preferencesList.find((p) => p.category === 'mood')?.choices || []
  const menuPreferences = preferencesList.find((p) => p.category === 'menu')?.choices || []
  const eventsPreferences = preferencesList.find((p) => p.category === 'events')?.choices || []

  const maxLength = Math.max(
    moodPreferences.length,
    menuPreferences.length,
    eventsPreferences.length,
  )

  return (
    <CCard className="border h-100">
      <CCardHeader>
        <CCardTitle className="mb-0">Предпочтения</CCardTitle>
      </CCardHeader>
      <CCardBody>
        {preferencesList.length > 0 ? (
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
                  <CTableDataCell>{moodPreferences[index] || '-'}</CTableDataCell>
                  <CTableDataCell>{menuPreferences[index] || '-'}</CTableDataCell>
                  <CTableDataCell>{eventsPreferences[index] || '-'}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <div className="text-center text-muted py-3">Предпочтения не указаны</div>
        )}
      </CCardBody>
    </CCard>
  )
}
