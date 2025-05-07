import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import { sendLogin, writeAuthData } from 'src/models/auth.model.ts'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const [authPending, setAuthPending] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const auth = () => {
    setAuthPending(true)
    sendLogin(login, password)
      .then((res) => writeAuthData(res.data))
      .then(() => setAuthPending(false))
      .then(() => navigate('/'))
      .then(() => toast.success('Вы успешно вошли в систему.'))
      .catch(() => {
        setAuthPending(false)
        toast.error('Неудачная попытка входа.', {})
      })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Вход</h1>
                    <p className="text-body-secondary">
                      Для продолжения работы войдите в свой аккаунт
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        required
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CLoadingButton
                          color="primary"
                          className="px-4"
                          loading={authPending}
                          onClick={auth}
                        >
                          Войти
                        </CLoadingButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
