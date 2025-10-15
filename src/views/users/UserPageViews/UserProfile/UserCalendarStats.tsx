import { CCard, CCardBody, CCardHeader, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import TooltipInfo from 'src/components/TooltipInfo.tsx'

interface DayStat {
  day: string
  total: number
  visited: number
}

interface TimeStat {
  category: string
  total: number
  range: string
  visited: number
}

interface Props {
  dayStats: DayStat[]
  timeStats: TimeStat[]
}

export const UserCalendarStats = ({ dayStats, timeStats }: Props) => {
  return (
    <CCard className="border h-100">
      <CCardHeader>
        <CCardTitle className="mb-0">Календарь посещений</CCardTitle>
      </CCardHeader>
      <CCardBody
        className={classNames('d-flex', 'flex-column', 'justify-content-center', 'text-capitalize')}
      >
        <strong className="mb-1">По дням недели:</strong>
        {dayStats.map((day, index) => (
          <div className={classNames('d-flex', 'flex-column', 'gap-2', 'w-100')} key={index}>
            <div className={classNames('d-flex', 'justify-content-between')}>
              <span>{day.day}</span>
              <span>
                {day.visited}/{day.total}
              </span>
            </div>
          </div>
        ))}
        <div>
          <strong className="mb-1">По времени суток:</strong>
          {timeStats.map((time, index) => (
            <div className={classNames('d-flex', 'flex-column', 'gap-2', 'w-100')} key={index}>
              <div className={classNames('d-flex', 'justify-content-between')}>
                <span className={classNames('d-flex', 'gap-2')}>
                  {time.category} <TooltipInfo content={time.range} />
                </span>
                <span>
                  {time.visited}/{time.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CCardBody>
    </CCard>
  )
}
