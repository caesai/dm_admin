import {
  CButton,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTooltip,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { IStory, StoryType } from 'src/types/Stories.ts'
import ImageInput from 'src/components/ImageInput.tsx'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { getStoryById, updateStory } from 'src/dataProviders/stories.ts'
import toast from 'react-hot-toast'

const StoryPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  isEdit: [boolean, Dispatch<SetStateAction<boolean>>]
  currentStoryId: [number | null, Dispatch<SetStateAction<number | null>>]
  setStoriesList: Dispatch<SetStateAction<IStory[]>>
}> = ({ popup, isEdit, setStoriesList, currentStoryId }) => {
  const [open, setOpen] = popup
  const [edit, setEdit] = isEdit
  const [storyId, setStoryId] = currentStoryId
  const [story, setStory] = useState<IStory>({
    type: 'IMAGE',
    duration: 0,
    url: null,
    title: null,
    description: null,
    button_url: null,
    button_text: null,
    button_color: null,
    order_index: 0,
    views_count: 0,
  })
  const [isActiveButton, setIsActiveButton] = useState(false)
  const closePopup = () => {
    setOpen(false)
    setEdit(false)
    setStoryId(null)
    setIsActiveButton(false)
    setStory({
      type: 'IMAGE',
      duration: 0,
      url: null,
      title: null,
      description: null,
      button_url: null,
      button_text: null,
      button_color: null,
      order_index: 0,
      views_count: 0,
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

  const changeStoryUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      url: e.target.value,
    }))
  }

  const changeStoryTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }

  const changeStoryDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }

  const changeButtonUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      button_url: e.target.value,
    }))
  }

  const changeButtonText = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      button_text: e.target.value,
    }))
  }

  const changeButtonColor = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      button_color: e.target.value,
    }))
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((res) =>
      setStory((prev) => ({
        ...prev,
        url: res.data.url,
      })),
    )
  }

  const handleChangeStory = () => {
    if (edit) {
      if (storyId === null) return
      updateStory(story, storyId)
        .then(() => {
          setStoriesList((prev) => prev.map((item) => (item.id === storyId ? story : item))) // заменяем старую историю новой
          toast('История обновлена')
        })
        .catch((e) => toast.error(e))
    } else {
      setStoriesList((prev) => [...prev, story]) // создаём новую историю без id
    }
    closePopup()
    setEdit(false)
  }

  useEffect(() => {
    if (edit && storyId !== null) {
      getStoryById(storyId)
        .then((res) => {
          setStory(res.data)
          if (res.data.button_text !== null || res.data.button_url !== null) {
            setIsActiveButton(true)
          }
        })
        .catch((e) => {
          toast.error(e)
          closePopup()
        })
    }
  }, [edit, storyId])

  return (
    <CModal alignment="center" size="lg" visible={open} onClose={closePopup}>
      <CModalHeader>
        <CModalTitle>{edit ? 'Редактирование истории' : 'Добавление новой истории:'}</CModalTitle>
      </CModalHeader>
      <CModalBody className="d-flex">
        <div className={classNames('w-75', 'd-flex', 'flex-column', 'gap-2')}>
          <CFormSelect
            options={[
              { label: 'Изображение', value: 'IMAGE' },
              { label: 'Видео', value: 'VIDEO' },
              { label: 'Компонент', value: 'COMPONENT' },
            ]}
            value={story.type}
            onChange={changeStoryType}
          />
          <div className={classNames('d-flex', 'align-items-center', 'gap-2')}>
            <div className={classNames('position-relative', 'w-100')}>
              <CFormInput
                placeholder="Длительность в секундах"
                value={story.duration !== 0 ? story.duration : ''}
                onChange={changeStoryDuration}
              />
              {!story.duration && (
                <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '21ex' }}>
                  *
                </strong>
              )}
            </div>
            <CTooltip content="Текст тултипа">
              <CIcon icon={cilInfo} />
            </CTooltip>
          </div>
          <div className={classNames('d-flex', 'align-items-center', 'gap-2', 'p-0')}>
            <CFormInput
              type="text"
              placeholder={story.type === 'COMPONENT' ? 'Контент URL' : 'URL обложки'}
              value={story.url === null ? '' : story.url}
              onInput={changeStoryUrl}
            />
            <ImageInput onChange={(e) => handleImageChange(e.target.files)} />
            <CTooltip content="Текст тултипа">
              <CIcon icon={cilInfo} />
            </CTooltip>
          </div>
          {story.type === 'COMPONENT' && (
            <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
              <CFormInput
                placeholder="Заголовок"
                value={story.title !== null ? story.title : ''}
                onInput={changeStoryTitle}
              />
              <CFormInput
                placeholder="Описание"
                value={story.description !== null ? story.description : ''}
                onInput={changeStoryDescription}
              />
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
                <CFormInput
                  placeholder="URL"
                  value={story.button_url !== null ? story.button_url : ''}
                  onInput={changeButtonUrl}
                />
                {story.button_url === null && (
                  <strong
                    className="fs-5"
                    style={{ position: 'absolute', top: '20%', left: '5ex' }}
                  >
                    *
                  </strong>
                )}
              </div>
              <div className={classNames('position-relative', 'w-100')}>
                <CFormInput
                  placeholder="Текст"
                  value={story.button_text !== null ? story.button_text : ''}
                  onInput={changeButtonText}
                />
                {story.button_text === null && (
                  <strong
                    className="fs-5"
                    style={{ position: 'absolute', top: '20%', left: '6ex' }}
                  >
                    *
                  </strong>
                )}
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
                  value={story.button_color !== null ? story.button_color : ''}
                  onInput={changeButtonColor}
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
            <CButton color="primary" className="w-100" onClick={handleChangeStory}>
              Сохранить
            </CButton>
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
