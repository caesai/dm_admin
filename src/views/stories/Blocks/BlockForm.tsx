import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormCheck,
  CFormInput,
  CLoadingButton,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import classNames from 'classnames'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import MediaInput from 'src/components/MediaInput.tsx'
import StoriesTable from 'src/views/stories/Stories/StoriesTable.tsx'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  createBlock,
  createStory,
  deleteBlock,
  deleteStory,
  updateBlock,
} from 'src/dataProviders/stories.ts'
import toast from 'react-hot-toast'
import { IStoriesBlock, IStory } from 'src/types/Stories.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'

const BlockForm: FC<{
  currentBlock: [IStoriesBlock, Dispatch<SetStateAction<IStoriesBlock>>]
  id: [number | null, Dispatch<number | null>]
  utilProps: [boolean, () => void]
}> = ({ currentBlock, id, utilProps }) => {
  const [isForAll, setIsForAll] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [openStoryPopup, setOpenStoryPopup] = useState(false)
  const [currentUser, setCurrentUser] = useState<number | null>(null)
  const [blockId] = id
  const [isEdit, cancelBlockEdit] = utilProps

  const [block, setBlock] = currentBlock
  const [storiesList, setStoriesList] = useState<IStory[]>(block.stories)
  const [storiesToDelete, setStoriesToDelete] = useState<IStory[]>([])

  const changeBlockName = (e: ChangeEvent<HTMLInputElement>) => {
    setBlock((prev) => ({
      ...prev,
      name: e.target.value,
    }))
  }

  const changeBlockActive = () => {
    setBlock((prev) => ({
      ...prev,
      active: !prev.active,
    }))
  }

  const changeBlockCities = (cityId: number) => {
    setBlock((prev) => ({
      ...prev,
      cities: prev.cities.includes(cityId)
        ? prev.cities.filter((id) => id !== cityId)
        : [...prev.cities, cityId],
    }))
  }

  const changeBlockThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    setBlock((prev) => ({
      ...prev,
      thumbnail: e.target.value,
    }))
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0], false).then((res) =>
      setBlock((prev) => ({
        ...prev,
        thumbnail: res.data.url,
      })),
    )
  }

  const addUser = () => {
    if (currentUser === null) return
    setBlock((prev) => ({
      ...prev,
      users: [...prev.users, currentUser],
    }))
    setCurrentUser(null)
  }

  const deleteUser = (userToDelete: number) => {
    setBlock((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user !== userToDelete),
    }))
  }

  const sendStories = async (blockId: number) => {
    // если нет id - создаём историю
    const newStories = storiesList.filter((story) => !story.id)
    for (const story of newStories) {
      await createStory(story, blockId)
    }
  }

  const deleteStories = async () => {
    for (const story of storiesToDelete) {
      if (!story.id) return
      await deleteStory(story.id)
    }
  }

  const handleSendBlock = () => {
    if (isEdit) {
      setIsLoading(true)
      updateBlock({
        id: blockId,
        ...block,
      })
        .then(() => {
          if (blockId !== null) {
            sendStories(blockId)
            deleteStories()
          }
        })
        .then(() => toast('Блок обновлён'))
        .catch((e) => toast.error(e))
        .finally(() => setIsLoading(false))
        .finally(() => cancelBlockEdit())
    } else {
      setIsLoading(true)
      createBlock({
        ...block,
      })
        .then((res) => {
          const id = res.data.id ? res.data.id : null
          if (id) {
            sendStories(id)
          }
        })
        .then(() => toast('Блок создан'))
        .catch((e) => toast.error(e))
        .finally(() => setIsLoading(false))
        .finally(() => cancelBlockEdit())
    }
  }

  const handleDeleteBlock = () => {
    if (blockId === null) return
    deleteBlock(blockId)
      .then(() => toast('Блок удалёе'))
      .catch((e) => toast.error(e))
      .finally(() => cancelBlockEdit())
  }

  useEffect(() => {
    if (block.users !== null) {
      setIsForAll(block.users.length === 0)
    }
  }, [block])

  useEffect(() => {
    setStoriesList(block.stories)
  }, [block.stories])

  useEffect(() => {
    setBlock((prev) => ({
      ...prev,
      stories: storiesList,
    }))
  }, [storiesList, setBlock])
  return (
    <CForm>
      <CRow className="mb-3">
        <div className={classNames('d-flex', 'align-items-center', 'p-0')}>
          <div className={classNames('position-relative', 'w-100')}>
            <CFormInput
              type="text"
              placeholder="Имя"
              onInput={changeBlockName}
              defaultValue={block.name}
            />
            {block.name === '' && (
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '6ex',
                }}
              >
                <strong className="fs-5">*</strong>
              </div>
            )}
          </div>
          <div className="ms-2">
            <CTooltip content="Текст тултипа">
              <CIcon icon={cilInfo} />
            </CTooltip>
          </div>
        </div>
      </CRow>
      <CRow className="mb-3">
        <div className={classNames('d-flex', 'align-items-center', 'gap-2', 'p-0')}>
          <CFormCheck label="Активный блок" onChange={changeBlockActive} checked={block.active} />
          <strong className="fs-5" style={{ transform: 'translateY(10%)' }}>
            *
          </strong>
          <CTooltip content="Текст тултипа">
            <CIcon icon={cilInfo} />
          </CTooltip>
        </div>
      </CRow>
      <CRow className="mb-3">
        <div className={classNames('d-flex', 'align-items-center', 'gap-2', 'p-0')}>
          <CFormInput
            type="text"
            placeholder="URL обложки"
            value={block.thumbnail || ''}
            onInput={changeBlockThumbnail}
          />
          <MediaInput onChange={(e) => handleImageChange(e.target.files)} />
          <CTooltip content="Текст тултипа">
            <CIcon icon={cilInfo} />
          </CTooltip>
        </div>
      </CRow>
      <CRow className="mb-3">
        <CAccordion className="p-0">
          <CAccordionItem>
            <CAccordionHeader className="d-flex">
              Выбор города
              <div className="ms-2">
                <CTooltip content="Текст тултипа">
                  <CIcon icon={cilInfo} />
                </CTooltip>
              </div>
            </CAccordionHeader>
            <CAccordionBody>
              <CFormCheck
                label="Москва"
                className={classNames('py-2', 'border-bottom')}
                checked={(block.cities || []).includes(1)}
                onChange={() => changeBlockCities(1)}
              />
              <CFormCheck
                label="Санкт-Петербург"
                className={classNames('py-2', 'border-bottom')}
                checked={(block.cities || []).includes(2)}
                onChange={() => changeBlockCities(2)}
              />
              <CFormCheck
                label="Екатеринбург"
                className="py-2"
                checked={(block.cities || []).includes(3)}
                onChange={() => changeBlockCities(3)}
              />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CRow>
      <CRow className="mb-3">
        <CFormCheck
          label="Доступен всем пользователям"
          onChange={() => setIsForAll(!isForAll)}
          checked={isForAll}
        />
      </CRow>
      {!isForAll && (
        <CRow className="mb-3">
          <CCard className="p-0">
            <CCardHeader className="d-flex">
              Доступно для аккаунтов:
              <div className="ms-3">
                <CTooltip content="Текст тултипа">
                  <CIcon icon={cilInfo} />
                </CTooltip>
              </div>
            </CCardHeader>
            <CCardBody>
              {block.users?.map((user) => (
                <CFormCheck
                  label={user}
                  indeterminate
                  className="mb-4"
                  key={user}
                  onClick={() => deleteUser(user)}
                />
              ))}
              <div className={classNames('d-flex', 'gap-2')}>
                <CButton color="primary" className="px-2" onClick={addUser}>
                  Добавить
                </CButton>
                <CFormInput
                  placeholder="Telegram ID"
                  className={classNames('text-center', 'w-auto')}
                  value={currentUser === null ? '' : String(currentUser)}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentUser(Number(e.target.value))
                  }
                />
              </div>
            </CCardBody>
          </CCard>
        </CRow>
      )}
      <CRow className={classNames('py-3', 'border-bottom', 'border-top', 'mt-4')}>
        <div
          className={classNames(
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'flex-nowrap',
          )}
        >
          <strong>Истории</strong>
          <CButton
            color="primary"
            style={{ width: 'fit-content' }}
            onClick={() => setOpenStoryPopup(true)}
          >
            + Добавить историю
          </CButton>
        </div>
      </CRow>
      <CRow className="mb-3">
        <StoriesTable
          popup={[openStoryPopup, setOpenStoryPopup]}
          stories={[storiesList, setStoriesList]}
          deleteStories={[storiesToDelete, setStoriesToDelete]}
        />
      </CRow>
      <CRow className="mb-3">
        <div className={classNames('mb-3', 'd-flex', 'flex-nowrap', 'gap-2', 'p-0')}>
          {isEdit && (
            <CButton
              color="danger"
              className={classNames('px-2', 'text-white')}
              onClick={handleDeleteBlock}
            >
              Удалить
            </CButton>
          )}
          <CButton color="secondary" className="w-100" onClick={cancelBlockEdit}>
            Отмена
          </CButton>
          <CLoadingButton
            color="primary"
            className="w-100"
            loading={isLoading}
            onClick={handleSendBlock}
          >
            {isEdit ? 'Сохранить изменения' : 'Опубликовать'}
          </CLoadingButton>
        </div>
      </CRow>
    </CForm>
  )
}

export default BlockForm
