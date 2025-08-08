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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilLightbulb } from '@coreui/icons'
import classNames from 'classnames'

const NewBlock = () => {
  return (
    <CCard className="border-0">
      <CCardHeader className="py-3">Добавление блока историй</CCardHeader>
      <CCardBody className="p-4">
        <CForm>
          <CRow className="mb-3">
            <CFormInput type="text" placeholder="Имя" />
          </CRow>
          <CRow className="mb-3">
            <CFormCheck id="isActiveCheckbox" label="Активный блок" />
          </CRow>
          <CRow className="mb-3">
            <CFormInput type="text" placeholder="URL обложки" />
          </CRow>
          <CRow className="mb-3">
            <CAccordion className="p-0">
              <CAccordionItem>
                <CAccordionHeader>
                  Выбор города <CIcon icon={cilLightbulb} className="ms-2" />
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
            <CFormCheck id="forAll" label="Доступен всем пользователям" />
          </CRow>
          <CRow className="mb-3">
            <CCard className="p-0">
              <CCardHeader>
                Доступно для аккаунтов: <CIcon icon={cilLightbulb} className="ms-1" />
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
              <CButton color="primary" style={{ width: 'fit-content' }}>
                + Добавить историю
              </CButton>
            </div>
          </CRow>
          <CRow className="mb-3">
            <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
              <CTableHead>
                <CTableHeaderCell className={classNames('text-start', 'py-4')}>#</CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-start', 'py-4')}>
                  Тип
                </CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-start', 'py-4')}>
                  Заголовок
                </CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-end', 'py-4')}>
                  Редактировать
                </CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-end', 'py-4')}>Вниз</CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-end', 'py-4')}>
                  Вверх
                </CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-end', 'pe-2', 'py-4')}>
                  Удалить
                </CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell className="text-start">132</CTableDataCell>
                  <CTableDataCell className="text-start">Компонент</CTableDataCell>
                  <CTableDataCell className="text-start">Отсутствует</CTableDataCell>
                  <CTableDataCell className="text-end">
                    <CButton color="primary">Редактировать</CButton>
                  </CTableDataCell>
                  <CTableDataCell className="text-end">
                    <CIcon icon={cilArrowBottom} size="xl" style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="text-end">
                    <CIcon icon={cilArrowTop} size="xl" style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className={classNames('text-end', 'pe-0')}>
                    <CButton color="primary">Удалить</CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
          <CRow className="mb-3">
            <div className={classNames('mb-3', 'd-flex', 'flex-nowrap', 'gap-2', 'p-0')}>
              <CButton color="secondary" className="w-100">
                Отмена <CIcon icon={cilLightbulb} />
              </CButton>
              <CLoadingButton color="primary" className="w-100">
                Опубликовать <CIcon icon={cilLightbulb} />
              </CLoadingButton>
            </div>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default NewBlock
