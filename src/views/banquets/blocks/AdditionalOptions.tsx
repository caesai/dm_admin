import classNames from 'classnames'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CFormInput,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { ChangeEvent, FC, useState } from 'react'
import {
  CreateAdditionalOptions,
  DeleteAdditionalOption,
  SendAdditionalOptions,
} from 'src/dataProviders/banquets.ts'
import toast from 'react-hot-toast'
import { IRestaurantAdditional } from 'src/types/Restaurant.ts'

const AdditionalOptions: FC<{
  options: IRestaurantAdditional[]
  restaurant_id: number
  onSave: () => void
}> = ({ options, restaurant_id, onSave }) => {
  const [newOption, setNewOption] = useState<string>('')
  const [isSaving, setSaving] = useState<boolean>(false)
  const [updatingOptions, setUpdatingOptions] = useState<{ [key: number]: boolean }>({})
  const [updatedOptions, setUpdatedOptions] = useState<{ [key: number]: string }>({})

  const handleChangeOption = (e: ChangeEvent<HTMLInputElement>, option_id: number) => {
    setUpdatedOptions((prev) => ({
      ...prev,
      [option_id]: e.target.value,
    }))
  }

  const saveNewOption = () => {
    if (newOption === '') return
    setSaving(true)

    CreateAdditionalOptions(
      {
        id: restaurant_id,
        name: newOption,
      },
      restaurant_id,
    )
      .then(() => {
        toast.success('Опция добавлена')
        setNewOption('')
        onSave()
      })
      .catch(() => toast.error('Что-то пошло не так'))
      .finally(() => setSaving(false))
  }

  const updateOption = (optionId: number) => {
    if (!updatedOptions[optionId] || updatedOptions[optionId].trim() === '') return

    setUpdatingOptions((prev) => ({ ...prev, [optionId]: true }))

    SendAdditionalOptions({ name: updatedOptions[optionId], id: optionId }, optionId)
      .then(() => {
        toast.success('Опция сохранена')
        setUpdatedOptions((prev) => {
          const newState = { ...prev }
          delete newState[optionId]
          return newState
        })
        onSave()
      })
      .catch(() => toast.error('Что-то пошло не так'))
      .finally(() => {
        setUpdatingOptions((prev) => ({ ...prev, [optionId]: false }))
      })
  }

  const deleteOption = (option_id: number) => {
    DeleteAdditionalOption(option_id)
      .then(() => {
        toast.success('Опция удалена')
        onSave()
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  return (
    <CCard className={classNames('border', 'rounded')}>
      <CCardHeader>
        <CCardTitle>Дополнительные опции</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <div className={classNames('px-3', 'd-flex', 'flex-column', 'gap-3')}>
          <CRow>
            <div className={classNames('d-flex', 'align-items-center', 'gap-4')}>
              <div className="w-100">
                <CFormInput
                  type="text"
                  floatingLabel="Дополнительная опция"
                  placeholder={''}
                  floatingClassName={'px-0'}
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
              </div>
              <div style={{ height: 'fit-content' }} className="w-25">
                <CLoadingButton
                  color="primary"
                  onClick={saveNewOption}
                  loading={isSaving}
                  disabled={!newOption}
                  className="w-100"
                >
                  Добавить
                </CLoadingButton>
              </div>
            </div>
          </CRow>
          {options.length > 0 && (
            <div className="mt-4">
              {options.map((option) => (
                <CRow key={option.id} className={classNames('mt-3')}>
                  <div className={classNames('d-flex', 'align-items-center', 'gap-4')}>
                    <div className="w-100">
                      <CFormInput
                        type="text"
                        value={
                          updatedOptions[option.id] !== undefined
                            ? updatedOptions[option.id]
                            : option.name
                        }
                        onChange={(event) => handleChangeOption(event, option.id)}
                      />
                    </div>
                    <div className={classNames('d-flex', 'gap-2', 'w-25')}>
                      <div className="w-100" style={{ height: 'fit-content' }}>
                        <CLoadingButton
                          color="primary"
                          className="w-100"
                          disabled={!updatedOptions[option.id]}
                          loading={updatingOptions[option.id]}
                          onClick={() => updateOption(option.id)}
                        >
                          Сохранить
                        </CLoadingButton>
                      </div>
                      <CButton color="secondary" onClick={() => deleteOption(option.id)}>
                        Удалить
                      </CButton>
                    </div>
                  </div>
                </CRow>
              ))}
            </div>
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default AdditionalOptions
