import {
  CButton,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTooltip,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import classNames from 'classnames'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { IStory, StoryType } from 'src/types/Stories.ts'

const StoryPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  isEdit: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ popup, isEdit }) => {
  const [open, setOpen] = popup
  const [edit, setEdit] = isEdit
  const [story, setStory] = useState<IStory>({
    id: '',
    type: 'image',
    duration: 0,
    url: null,
  })
  const [isActiveButton, setIsActiveButton] = useState(false)
  const closePopup = () => {
    setOpen(false)
    setEdit(false)
    setIsActiveButton(false)
    setStory({
      id: '',
      type: 'image',
      duration: 0,
      url: null,
    })
  }

  const changeStoryType = (e: ChangeEvent<HTMLSelectElement>) => {
    setStory((prev) => ({
      ...prev,
      type: e.target.value as StoryType,
    }))
  }

  const changeStoryDuration = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      duration: Number(e.target.value),
    }))
  }

  return (
    <CModal alignment="center" size="lg" visible={open} onClose={closePopup}>
      <CModalHeader>
        <CModalTitle>{edit ? 'Редактирование истории' : 'Добавление новой истории:'}</CModalTitle>
      </CModalHeader>
      <CModalBody className="d-flex">
        <div className={classNames('w-75', 'd-flex', 'flex-column', 'gap-2')}>
          <CFormSelect
            options={[
              { label: 'Изображение', value: 'image' },
              { label: 'Видео', value: 'video' },
              { label: 'Компонент', value: 'component' },
            ]}
            onChange={changeStoryType}
          />
          <div className={classNames('d-flex', 'align-items-center', 'gap-2')}>
            <div className={classNames('position-relative', 'w-100')}>
              <CFormInput placeholder="Длительность в секундах" onChange={changeStoryDuration} />
              <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '21ex' }}>
                *
              </strong>
            </div>
            <CTooltip content="Текст тултипа">
              <CIcon icon={cilInfo} />
            </CTooltip>
          </div>
          <CFormInput placeholder="URL обложки" />
          {story.type === 'component' && (
            <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
              <CFormInput placeholder="Заголовок" />
              <CFormInput placeholder="Описание" />
              <div className={classNames('d-flex', 'align-items-center', 'gap-2')}>
                <CFormCheck
                  label="Кнопка"
                  checked={isActiveButton}
                  onChange={() => setIsActiveButton(!isActiveButton)}
                />
                <CTooltip content="Текст тултипа">
                  <CIcon icon={cilInfo} />
                </CTooltip>
              </div>
            </div>
          )}
          {isActiveButton && (
            <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
              <div className={classNames('position-relative', 'w-100')}>
                <CFormInput placeholder="URL" />
                <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '5ex' }}>
                  *
                </strong>
              </div>
              <div className={classNames('position-relative', 'w-100')}>
                <CFormInput placeholder="Текст" />
                <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '6ex' }}>
                  *
                </strong>
              </div>
              <div
                className={classNames(
                  'd-flex',
                  'align-items-center',
                  'gap-2',
                  'border',
                  'rounded',
                  'px-2',
                )}
              >
                <CFormInput
                  type="color"
                  className="border-0"
                  label={
                    <>
                      Цвет
                      <strong className={classNames('ms-2', 'align-middle', 'fs-5')}>*</strong>
                    </>
                  }
                />
              </div>
            </div>
          )}
          <div className={classNames('mt-auto', 'd-flex', 'gap-2')}>
            <CButton color="secondary" className="w-100" onClick={closePopup}>
              Отмена
            </CButton>
            <CLoadingButton color="primary" className="w-100">
              Сохранить
            </CLoadingButton>
          </div>
        </div>
        <div className={classNames('w-25', 'h-100', 'ms-4')}>
          <strong>Превью</strong>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default StoryPopup
