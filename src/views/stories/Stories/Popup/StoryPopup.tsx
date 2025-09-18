import { CFormSelect, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import { IStory, StoryType } from 'src/types/Stories.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { getStoryById } from 'src/dataProviders/stories.ts'
import toast from 'react-hot-toast'
import ButtonSection from './ButtonSection'
import DurationInput from './DurationInput'
import MediaUrlInput from './MediaUrlInput'
import ComponentFields from './ComponentFields'
import ButtonFields from './ButtonFields'
import TooltipInfo from 'src/components/TooltipInfo'

interface StoryPopupProps {
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  isEdit: [boolean, Dispatch<SetStateAction<boolean>>]
  currentStoryId: [number | null, Dispatch<SetStateAction<number | null>>]
  setStoriesList: Dispatch<SetStateAction<IStory[]>>
  updateStories: Dispatch<SetStateAction<IStory[]>>
}

const StoryPopup: FC<StoryPopupProps> = ({
  popup,
  isEdit,
  setStoriesList,
  currentStoryId,
  updateStories,
}) => {
  const [open, setOpen] = popup
  const [edit, setEdit] = isEdit
  const [storyId, setStoryId] = currentStoryId
  const [story, setStory] = useState<IStory>({
    type: 'image',
    duration: 0,
    url: null,
    title: null,
    description: null,
    button_url: null,
    button_text: null,
    button_color: null,
    component_type: null,
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
      type: 'image',
      duration: 0,
      url: null,
      title: null,
      description: null,
      button_url: null,
      button_text: null,
      button_color: null,
      component_type: null,
      order_index: 0,
      views_count: 0,
    })
  }
  const changeStoryType = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as StoryType
    setStory((prev) => ({
      ...prev,
      type: e.target.value as StoryType,
      component_type: newType !== 'component' ? null : prev.component_type,
    }))
  }
  const changeStoryDuration = (e: ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({
      ...prev,
      duration: Number(e.target.value) * 1000,
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
  const handleMediaChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    const file = files[0]
    if (story.type === 'video') {
      uploadFile(file).then((res) =>
        setStory((prev) => ({
          ...prev,
          url: res.data.url,
        })),
      )
    } else {
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)

      img.onload = () => {
        const imageRatio = img.height / img.width
        let component_type: number | null = null

        if (story.type === 'component') {
          component_type = imageRatio <= 1 ? 1 : 2
        }

        uploadFile(file).then((res) =>
          setStory((prev) => ({
            ...prev,
            url: res.data.url,
            component_type,
          })),
        )
        URL.revokeObjectURL(objectUrl)
      }

      img.onerror = () => {
        uploadFile(file).then((res) =>
          setStory((prev) => ({
            ...prev,
            url: res.data.url,
            component_type: null,
          })),
        )
        URL.revokeObjectURL(objectUrl)
      }
      img.src = objectUrl
    }
  }
  const handleChangeStory = () => {
    if (edit) {
      if (storyId === null) return
      if (storyId) {
        const updatedStory = { ...story }
        setStoriesList((prev) => prev.map((item) => (item.id === storyId ? updatedStory : item)))
        updateStories((prev) => [...prev, updatedStory])
      } else if (story.tempId) {
        const updatedStory = { ...story }
        setStoriesList((prev) =>
          prev.map((item) => (item.tempId === story.tempId ? updatedStory : item)),
        )
      }
    } else {
      const newStory = {
        ...story,
        tempId: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      }
      setStoriesList((prev) => [...prev, newStory])
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
          <div className={classNames('d-flex', 'align-items-center', 'gap-2')}>
            <CFormSelect
              options={[
                { label: 'Изображение', value: 'image' },
                { label: 'Видео', value: 'video' },
                { label: 'Кастомная история', value: 'component' },
              ]}
              value={story.type}
              onChange={changeStoryType}
            />
            <TooltipInfo content="Выберите тип контента для истории" />
          </div>
          <DurationInput duration={story.duration} onChange={changeStoryDuration} />
          <MediaUrlInput
            url={story.url}
            type={story.type}
            onUrlChange={changeStoryUrl}
            onMediaChange={handleMediaChange}
          />
          {story.type === 'component' && (
            <ComponentFields
              title={story.title}
              description={story.description}
              isActiveButton={isActiveButton}
              onTitleChange={changeStoryTitle}
              onDescriptionChange={changeStoryDescription}
              onButtonToggle={() => setIsActiveButton(!isActiveButton)}
            />
          )}
          {isActiveButton && (
            <ButtonFields
              buttonUrl={story.button_url}
              buttonText={story.button_text}
              buttonColor={story.button_color}
              onUrlChange={changeButtonUrl}
              onTextChange={changeButtonText}
              onColorChange={changeButtonColor}
            />
          )}
          <ButtonSection
            onCancel={closePopup}
            onSave={handleChangeStory}
            isActive={story.duration !== 0}
          />
        </div>
        <div className={classNames('w-25', 'h-100', 'ms-4')}>
          <strong>Превью</strong>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default StoryPopup
