import { CButton, CCardBody, CMultiSelect } from '@coreui/react-pro'
import classNames from 'classnames'
import TooltipInfo from 'src/components/TooltipInfo'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { getRestaurantCity } from 'src/utils.tsx'

interface RestaurantSectionProps {
  currentRestaurantIds: number[]
  changeRestaurantIds: (options: Array<{ value: string | number }>) => void
  restaurants: IRestaurantWCity[]
  previewText: string
  previewMailing: () => void
  isActiveNotificationButton: boolean
  setIsPopupOpen: (open: boolean) => void
}

export const RestaurantSection = ({
  currentRestaurantIds,
  changeRestaurantIds,
  restaurants,
  previewText,
  previewMailing,
  isActiveNotificationButton,
  setIsPopupOpen,
}: RestaurantSectionProps) => {
  return (
    <CCardBody className={classNames('d-flex', 'flex-column', 'gap-2')}>
      <div className={classNames('d-flex', 'align-items-center')}>
        <CMultiSelect
          className={'w-100'}
          selectionType={'tags'}
          selectAll={false}
          placeholder={'Выберите ресторан'}
          onChange={changeRestaurantIds}
          options={[
            {
              label: 'Всем',
              value: 0,
              disabled: currentRestaurantIds.length > 0 && !currentRestaurantIds.includes(0),
            },
            ...restaurants.map((restaurant) => ({
              label: `Клиентам ${restaurant.title}, ${getRestaurantCity(restaurants, restaurant.id)}`,
              value: `${restaurant.id}`,
              disabled: currentRestaurantIds.includes(0),
            })),
          ]}
        />
        <div className="ms-2">
          <TooltipInfo content="Выберите ресторан, чтобы отправить сообщение только его клиентам." />
        </div>
      </div>
      <span>{previewText}</span>
      <div className={classNames('d-flex', 'align-items-center', 'w-25')}>
        <CButton
          color="primary"
          className={classNames('px-4', 'w-100')}
          onClick={previewMailing}
          disabled={!currentRestaurantIds.length}
        >
          База рассылки
        </CButton>
        <div className="ms-2">
          <TooltipInfo content="Узнать количество получателей." />
        </div>
      </div>
      <div className={classNames('d-flex', 'align-items-center', 'w-25')}>
        <CButton
          color="primary"
          className={classNames('px-4', 'w-100')}
          onClick={() => setIsPopupOpen(true)}
          disabled={!isActiveNotificationButton}
        >
          Рассылка
        </CButton>
        <div className="ms-2">
          <TooltipInfo content="Разослать сообщение всем пользователям. Функция доступна только после теста рассылки." />
        </div>
      </div>
    </CCardBody>
  )
}
