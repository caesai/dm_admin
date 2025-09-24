import { IUserFull } from 'src/types/User.ts'
import { CBadge, CCard, CCardBody, CCardImage, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import css from 'src/views/style/layout.module.css'

interface Props {
  user: IUserFull
}

export const UserEdit = ({ user }: Props) => {
  const getBadge = (status: boolean) => {
    return status ? 'success' : 'secondary'
  }
  return (
    <>
      <CCard style={{ width: '18rem', minWidth: '18rem' }}>
        <CCardImage orientation="top" src={user?.photo_url} />
        <CCardBody>
          <CCardTitle>{user.first_name}</CCardTitle>
          <div className={classNames(css.fc8)}>
            <span>Телефон: {user.phone_number}</span>
            <span>Email: {user.email}</span>
            <span>Регистрация: {new Date(user.created_at).toLocaleString()}</span>
            <span>Посл.редакт.: {new Date(user.updated_at).toLocaleString()}</span>
            <span>
              Ранний доступ.{' '}
              <CBadge color={getBadge(user.early_access)}>
                {user.early_access ? 'Да' : 'Нет'}
              </CBadge>
            </span>
            <span>
              Лиц. соглашение{' '}
              <CBadge color={getBadge(user.license_agreement)}>
                {user.license_agreement ? 'Да' : 'Нет'}
              </CBadge>
            </span>
            <span>
              Обработка данных{' '}
              <CBadge color={getBadge(user.gdpr_agreement)}>
                {user.gdpr_agreement ? 'Да' : 'Нет'}
              </CBadge>
            </span>
            <span>
              Рассылки{' '}
              <CBadge color={getBadge(user.advertisement_agreement)}>
                {user.advertisement_agreement ? 'Да' : 'Нет'}
              </CBadge>
            </span>
          </div>
        </CCardBody>
      </CCard>
      {/*<CForm className={'row g-3 needs-validation'}>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormInput*/}
      {/*      type={'text'}*/}
      {/*      id={'first_name'}*/}
      {/*      defaultValue={user.first_name}*/}
      {/*      label={'Имя'}*/}
      {/*    ></CFormInput>*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormInput*/}
      {/*      type={'text'}*/}
      {/*      id={'last_name'}*/}
      {/*      defaultValue={user.last_name}*/}
      {/*      label={'Фамилия'}*/}
      {/*    ></CFormInput>*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormInput*/}
      {/*      type={'text'}*/}
      {/*      id={'email'}*/}
      {/*      defaultValue={user.email}*/}
      {/*      label={'Email'}*/}
      {/*    ></CFormInput>*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormLabel htmlFor="userFirstname">Логин Telegram</CFormLabel>*/}
      {/*    <CInputGroup>*/}
      {/*      <CInputGroupText>@</CInputGroupText>*/}
      {/*      <CFormInput*/}
      {/*        type="text"*/}
      {/*        id="validationCustomUsername"*/}
      {/*        disabled={true}*/}
      {/*        value={user.username}*/}
      {/*      />*/}
      {/*    </CInputGroup>*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormInput*/}
      {/*      type={'text'}*/}
      {/*      id={'phone_number'}*/}
      {/*      defaultValue={user.phone_number}*/}
      {/*      label={'Телефон'}*/}
      {/*    ></CFormInput>*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormCheck label={'Ранний доступ'} defaultChecked={user.early_access} />*/}
      {/*    <CFormCheck label={'Рассылки'} defaultChecked={user.advertisement_agreement} />*/}
      {/*    <CFormCheck label={'Лицензионное соглашение'} defaultChecked={user.license_agreement} />*/}
      {/*    <CFormCheck label={'Политика конфиденциальности'} defaultChecked={user.gdpr_agreement} />*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormInput*/}
      {/*      type={'text'}*/}
      {/*      id={'phone_number'}*/}
      {/*      defaultValue={user.phone_number}*/}
      {/*      label={'Телефон'}*/}
      {/*    ></CFormInput>*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CDatePicker label={'Дата рождения'} id={'date_of_birth'} date={user.date_of_birth} />*/}
      {/*  </CCol>*/}
      {/*  <CCol md={4}>*/}
      {/*    <CFormTextarea*/}
      {/*      id="allergies"*/}
      {/*      label="Аллергии"*/}
      {/*      rows={3}*/}
      {/*      defaultValue={user?.allergies}*/}
      {/*    ></CFormTextarea>*/}
      {/*  </CCol>*/}
      {/*  <CRow>*/}
      {/*    <CCol>*/}
      {/*      <CButton color={'primary'} type={'submit'}>*/}
      {/*        Обновить*/}
      {/*      </CButton>*/}
      {/*    </CCol>*/}
      {/*  </CRow>*/}
      {/*</CForm>*/}
    </>
  )
}
