import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CLoadingButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import TooltipInfo from 'src/components/TooltipInfo'
import { IMedia } from 'src/types/Media.ts'
import { ChangeEvent, RefObject } from 'react'

interface MediaSectionProps {
  media: IMedia[]
  documentFile: IMedia | null
  imageUploadInProgress: boolean
  videoUploadInProgress: boolean
  imageInputRef: RefObject<HTMLInputElement | null>
  videoInputRef: RefObject<HTMLInputElement | null>
  handlePhoto: (e: ChangeEvent<HTMLInputElement>) => void
  handleVideo: (e: ChangeEvent<HTMLInputElement>) => void
  handleDocument: (e: ChangeEvent<HTMLInputElement>) => void
  setFileType: (type: string) => string
  handleDeleteMedia: (id: string) => void
  moveMediaUp: (index: number) => void
  moveMediaDown: (index: number) => void
  buttonText: string
  buttonUrl: string
}

export const MediaSection = ({
  media,
  documentFile,
  imageUploadInProgress,
  videoUploadInProgress,
  imageInputRef,
  videoInputRef,
  handlePhoto,
  handleVideo,
  handleDocument,
  setFileType,
  handleDeleteMedia,
  moveMediaUp,
  moveMediaDown,
  buttonText,
  buttonUrl,
}: MediaSectionProps) => {
  return (
    <CCard className="mb-4 mx-2">
      <CCardHeader>
        <div className="d-flex align-items-center">
          <p>Прикреплённые Медиа</p>
          <div className="ms-2">
            <TooltipInfo content="Можно прикрепить до 10 медиафайлов, либо один медиафайл и кнопку. Прикрепление документов при этом будет недоступно." />
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        {media.length > 0 && (
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Файл</CTableHeaderCell>
                <CTableHeaderCell>Тип</CTableHeaderCell>
                <CTableHeaderCell>Вверх</CTableHeaderCell>
                <CTableHeaderCell>Вниз</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Удалить</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {media.map((file, index) => (
                <CTableRow key={file.id}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{file.name}</CTableDataCell>
                  <CTableDataCell>{setFileType(file.type)}</CTableDataCell>
                  <CTableDataCell>
                    <CIcon
                      icon={cilArrowTop}
                      size="xl"
                      style={{ cursor: 'pointer' }}
                      onClick={() => moveMediaUp(index)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CIcon
                      icon={cilArrowBottom}
                      size="xl"
                      style={{ cursor: 'pointer' }}
                      onClick={() => moveMediaDown(index)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton color="primary" onClick={() => handleDeleteMedia(file.id)}>
                      Удалить
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
        {!documentFile && (
          <div className={classNames('d-flex', 'gap-3', 'justify-content-end')}>
            <CLoadingButton
              color="primary"
              disabled={(media.length === 1 && !!(buttonText || buttonUrl)) || media.length >= 10}
              loading={imageUploadInProgress}
            >
              <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
                + Прикрепить Изображение
              </label>
            </CLoadingButton>
            <input
              ref={imageInputRef}
              type="file"
              id="imageInput"
              onChange={handlePhoto}
              accept="image/*"
              className="d-none"
            />
            <CLoadingButton
              color="primary"
              disabled={(media.length === 1 && !!(buttonText || buttonUrl)) || media.length >= 10}
              loading={videoUploadInProgress}
            >
              <label htmlFor="videoInput" style={{ cursor: 'pointer' }}>
                + Прикрепить Видео
              </label>
            </CLoadingButton>
            <input
              ref={videoInputRef}
              type="file"
              id="videoInput"
              onChange={handleVideo}
              accept="video/*"
              className="d-none"
            />
          </div>
        )}
        {media.length === 0 && (
          <div className="mt-3">
            <CFormInput
              type="file"
              label={
                <div className="d-flex align-items-center">
                  Документ
                  <div className="ms-2">
                    <TooltipInfo content="Если прикрепить документ, то добавление медиафайлов будет недоступно." />
                  </div>
                </div>
              }
              onChange={handleDocument}
            />
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}
