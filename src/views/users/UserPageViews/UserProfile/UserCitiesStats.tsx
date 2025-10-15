import { CCard, CCardBody, CCardHeader, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'

interface CityStat {
  cityName: string
  total: number
  visited: number
}

interface Props {
  cityStats: CityStat[]
}

export const UserCitiesStats = ({ cityStats }: Props) => {
  return (
    <CCard className="border h-100">
      <CCardHeader>
        <CCardTitle className="mb-0">Города посещения/бронирования</CCardTitle>
      </CCardHeader>
      <CCardBody>
        {cityStats.length > 0 && (
          <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
            {cityStats.map((city, index) => (
              <div
                className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                key={index}
              >
                <strong>{city.cityName}</strong>
                <span className={classNames('d-flex', 'align-items-center')}>
                  {city.visited}/{city.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}
