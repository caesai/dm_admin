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
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import classNames from 'classnames'
import { useState } from 'react'
import StoriesTable from 'src/views/stories/Stories/StoriesTable.tsx'

const NewBlock = () => {
  const [isForAll, setIsForAll] = useState(false)
  const [openStoryPopup, setOpenStoryPopup] = useState(false)
  return (
    <CCard className="border-0">
      <CCardHeader className="py-3">Добавление блока историй</CCardHeader>
      <CCardBody className="p-4">
        <CForm>
          <CRow className="mb-3">
            <div className={classNames('d-flex', 'align-items-center', 'p-0')}>
              <div className={classNames('position-relative', 'w-100')}>
                <CFormInput type="text" placeholder="Имя" />
                <div
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '6ex',
                  }}
                >
                  <strong className="fs-5">*</strong>
                </div>
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
              <CFormCheck id="isActiveCheckbox" label="Активный блок" />
              <strong className="fs-5" style={{ transform: 'translateY(10%)' }}>
                *
              </strong>
              <CTooltip content="Текст тултипа">
                <CIcon icon={cilInfo} />
              </CTooltip>
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormInput type="text" placeholder="URL обложки" />
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
            <StoriesTable popup={[openStoryPopup, setOpenStoryPopup]} />
          </CRow>
          <CRow className="mb-3">
            <div className={classNames('mb-3', 'd-flex', 'flex-nowrap', 'gap-2', 'p-0')}>
              <CButton color="secondary" className={classNames('w-100', 'position-relative')}>
                Отмена
                <div style={{ position: 'absolute', right: '3%', top: '25%' }}>
                  <CTooltip content="Текст тултипа">
                    <CIcon icon={cilInfo} size="lg" />
                  </CTooltip>
                </div>
              </CButton>
              <CLoadingButton color="primary" className={classNames('w-100', 'position-relative')}>
                Опубликовать
                <div style={{ position: 'absolute', right: '3%', top: '25%' }}>
                  <CTooltip content="Текст тултипа">
                    <CIcon icon={cilInfo} size="lg" />
                  </CTooltip>
                </div>
              </CLoadingButton>
            </div>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default NewBlock
