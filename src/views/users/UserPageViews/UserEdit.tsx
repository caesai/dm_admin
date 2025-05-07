import { IUserFull } from 'src/types/User.ts'
import {
  CButton,
  CCol,
  CDatePicker,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'

interface Props {
  user: IUserFull
}

export const UserEdit = ({ user }: Props) => {
  return (
    <CForm className={'row g-3 needs-validation'}>
      <CCol md={4}>
        <CFormInput
          type={'text'}
          id={'first_name'}
          defaultValue={user.first_name}
          label={'Имя'}
        ></CFormInput>
      </CCol>
      <CCol md={4}>
        <CFormInput
          type={'text'}
          id={'last_name'}
          defaultValue={user.last_name}
          label={'Фамилия'}
        ></CFormInput>
      </CCol>
      <CCol md={4}>
        <CFormInput
          type={'text'}
          id={'email'}
          defaultValue={user.email}
          label={'Email'}
        ></CFormInput>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="userFirstname">Логин Telegram</CFormLabel>
        <CInputGroup>
          <CInputGroupText>@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationCustomUsername"
            disabled={true}
            value={user.username}
          />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CFormInput
          type={'text'}
          id={'phone_number'}
          defaultValue={user.phone_number}
          label={'Телефон'}
        ></CFormInput>
      </CCol>
      <CCol md={4}>
        <CFormCheck label={'Ранний доступ'} defaultChecked={user.early_access} />
        <CFormCheck label={'Рассылки'} defaultChecked={user.advertisement_agreement} />
        <CFormCheck label={'Лицензионное соглашение'} defaultChecked={user.license_agreement} />
        <CFormCheck label={'Политика конфиденциальности'} defaultChecked={user.gdpr_agreement} />
      </CCol>
      <CCol md={4}>
        <CFormInput
          type={'text'}
          id={'phone_number'}
          defaultValue={user.phone_number}
          label={'Телефон'}
        ></CFormInput>
      </CCol>
      <CCol md={4}>
        <CDatePicker label={'Дата рождения'} id={'date_of_birth'} date={user.date_of_birth} />
      </CCol>
      <CCol md={4}>
        <CFormTextarea
          id="allergies"
          label="Аллергии"
          rows={3}
          defaultValue={user?.allergies}
        ></CFormTextarea>
      </CCol>
      <CRow>
        <CCol>
          <CButton color={'primary'} type={'submit'}>
            Обновить
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}
