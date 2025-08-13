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
import ImageInput from 'src/components/ImageInput.tsx'
import StoriesTable from 'src/views/stories/Stories/StoriesTable.tsx'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { createBlock, createStory, updateBlock } from 'src/dataProviders/stories.ts'
import toast from 'react-hot-toast'
import { IStoriesBlock, IStory } from 'src/types/Stories.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'

const BlockForm: FC<{
  currentBlock: [IStoriesBlock, Dispatch<SetStateAction<IStoriesBlock>>]
  id: [number | null, Dispatch<number | null>]
  utilProps: [boolean, () => void]
}> = ({ currentBlock, id, utilProps }) => {
  const [isForAll, setIsForAll] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openStoryPopup, setOpenStoryPopup] = useState(false)
  const [storiesList, setStoriesList] = useState<IStory[]>([])
  const [block, setBlock] = currentBlock
  const [blockId] = id
  const [isEdit, cancelBlockEdit] = utilProps
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
    uploadFile(files[0]).then((res) =>
      setBlock((prev) => ({
        ...prev,
        thumbnail: res.data.url,
      })),
    )
  }

  const sendStories = (id: number) => {
    console.log('sending stories...')
    storiesList.map((story) => {
      createStory(story, id)
    })
  }

  const sendBlock = () => {
    if (isEdit) {
      setIsLoading(true)
      updateBlock({
        id: blockId,
        ...block,
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
            defaultValue={block.thumbnail === null ? '' : block.thumbnail}
            onInput={changeBlockThumbnail}
          />
          <ImageInput onChange={(e) => handleImageChange(e.target.files)} />
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
                id="MoscowCheckbox"
                label="Москва"
                className={classNames('py-2', 'border-bottom')}
              />
              <CFormCheck
                id="StPetersburgCheckbox"
                label="Санкт-Петербург"
                className={classNames('py-2', 'border-bottom')}
              />
              <CFormCheck id="EkaterinburgCheckbox" label="Екатеринбург" className="py-2" />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CRow>
      <CRow className="mb-3">
        <CFormCheck
          label="Доступен всем пользователям"
          onChange={() => setIsForAll(!isForAll)}
          checked={!isForAll}
        />
      </CRow>
      {isForAll && (
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
              <CFormCheck label="User-01" indeterminate />
              <CFormCheck label="User-02" indeterminate />
              <CFormCheck
                label={<CFormInput placeholder="Telegram ID" className="text-center" />}
                checked={true}
                className={classNames('mt-4', 'd-flex', 'align-items-center', 'gap-3', 'w-25')}
              />
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
          blockId={blockId !== null ? blockId : undefined}
        />
      </CRow>
      <CRow className="mb-3">
        <div className={classNames('mb-3', 'd-flex', 'flex-nowrap', 'gap-2', 'p-0')}>
          <CButton color="secondary" className="w-100" onClick={cancelBlockEdit}>
            Отмена
          </CButton>
          <CLoadingButton color="primary" className="w-100" loading={isLoading} onClick={sendBlock}>
            {isEdit ? 'Сохранить изменения' : 'Опубликовать'}
          </CLoadingButton>
        </div>
      </CRow>
    </CForm>
  )
}

export default BlockForm
