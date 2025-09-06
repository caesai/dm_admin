import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCardGroup,
  CCard,
  CCardBody,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { ICode } from 'src/types/Code.ts'
import { createCode, deleteCode, getCodeById, updateCode } from 'src/dataProviders/codes.ts'
import toast from 'react-hot-toast'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'

const InviteLinkPopup: FC<{
  popupId: [number | null | undefined, Dispatch<SetStateAction<number | null | undefined>>]
  onUpdate?: () => Promise<void>
}> = ({ popupId, onUpdate }) => {
  const [id, setId] = popupId
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [editorContent, setEditorContent] = useState<string>('')
  const [code, setCode] = useState<ICode>({
    name: '',
    code: '',
    text: null,
    restaurant_id: null,
  })

  const fetchCode = async () => {
    try {
      if (id === null || id === undefined) return
      const response = await getCodeById(id)
      setCode(response.data)
      setEditorContent(response.data.text ? response.data.text : '')
    } catch (error) {
      console.error(error)
    }
  }

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const handleSaveCode = async () => {
    if (id === undefined) return
    try {
      const codeData = {
        ...code,
        text: editorContent,
      }
      if (id === null) {
        await createCode(codeData)
        toast.success('Инвайт-ссылка создана')
      } else {
        await updateCode(codeData, id)
        toast.success('Инвайт-ссылка обновлена')
      }
      setId(undefined)
      if (onUpdate) {
        await onUpdate()
      }
    } catch (error) {
      toast.error(id === null ? 'Ошибка при создании' : 'Ошибка при обновлении')
      console.error(error)
    }
  }

  const handleDeleteCode = async () => {
    if (id === undefined) return
    try {
      if (id === null) {
        setId(undefined)
        return
      }
      await deleteCode(id)
      toast.success('Инвайт-ссылка удалена')
      setId(undefined)
      if (onUpdate) {
        await onUpdate()
      }
    } catch (error) {
      toast.error('Ошибка при удалении')
      console.error(error)
    }
  }

  const getCity = (restaurantId: number) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId)
    if (restaurant?.title === 'Smoke BBQ' && restaurant?.city.name === 'Санкт-Петербург') {
      return restaurant?.address
    }
    return restaurant?.city.name
  }

  const changeLinkCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode((prev) => ({ ...prev, code: e.target.value }))
  }

  const changeLinkName = (e: ChangeEvent<HTMLInputElement>) => {
    setCode((prev) => ({ ...prev, name: e.target.value }))
  }

  const changeRestaurant = (e: ChangeEvent<HTMLSelectElement>) => {
    const restaurantId = e.target.value ? parseInt(e.target.value) : null
    setCode((prev) => ({ ...prev, restaurant_id: restaurantId }))
  }

  useEffect(() => {
    fetchCode()
    loadRestaurants()
  }, [id])
  return (
    <CModal
      size="lg"
      alignment="center"
      visible={id !== undefined}
      onClose={() => setId(undefined)}
    >
      <CModalHeader>
        <CModalTitle>
          {id === null ? 'Добавление инвайт-ссылки' : 'Редактирование инвайт-ссылки'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardGroup className={classNames('flex-column', 'gap-2')}>
          <CCard className={classNames('border-0', 'position-relative')}>
            <CFormInput placeholder="Код-ссылки" value={code?.code} onInput={changeLinkCode} />
            {code?.code === '' && (
              <strong
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: '1em',
                  color: 'red',
                  fontSize: '1.5em',
                }}
              >
                *
              </strong>
            )}
          </CCard>
          <CCard className={classNames('border-0', 'position-relative')}>
            <CFormInput placeholder="Имя ссылки" value={code?.name} onInput={changeLinkName} />
            {code?.name === '' && (
              <strong
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: '1em',
                  color: 'red',
                  fontSize: '1.5em',
                }}
              >
                *
              </strong>
            )}
          </CCard>
          <CCard className="border-0">
            <CFormSelect
              value={code?.restaurant_id || ''}
              onChange={changeRestaurant}
              options={[
                { label: 'Ресторан', value: '' },
                ...restaurants.map((restaurant) => ({
                  label: `${restaurant.title}, ${getCity(restaurant.id)}`,
                  value: `${restaurant.id}`,
                })),
              ]}
            />
          </CCard>
          <CCard className="border-0">
            <CCardBody className={classNames('border', 'rounded')}>
              <TextEditor
                onUpdate={setEditorContent}
                initialContent={code?.text ?? 'Приветственный текст'}
              />
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={handleDeleteCode}>
          {id === null ? 'Отменить' : 'Удалить'}
        </CButton>
        <CButton color="primary" className="w-100" onClick={handleSaveCode}>
          {id === null ? 'Добавить' : 'Сохранить'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default InviteLinkPopup
