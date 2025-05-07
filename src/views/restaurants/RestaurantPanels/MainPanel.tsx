import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardImage,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ICity } from 'src/types/City.ts'
import { GetCities } from 'src/dataProviders/cities.ts'
import { IChef } from 'src/types/Chef.ts'
import { GetChefsList } from 'src/dataProviders/chefs.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { UpdateRestaurantMain } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'

interface IMainPanel {
  restaurant: IRestaurant
}

export const MainPanel = ({ restaurant }: IMainPanel) => {
  const [res, setRes] = useState<IRestaurant>(restaurant)
  const [cities, setCities] = useState<ICity[]>([])
  const [chefs, setChefs] = useState<IChef[]>([])

  useEffect(() => {
    GetCities().then((res) => setCities(res.data))
  }, [])
  useEffect(() => {
    GetChefsList().then((res) => setChefs(res.data))
  }, [])

  const saveChanges = () => {
    UpdateRestaurantMain(res)
      .then(() => toast('Изменения сохранены'))
      .catch(() => toast('Произошла ошибка при сохранении изменений'))
  }

  const handleChangeFileLogo = async (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setRes((prev) => ({ ...prev, logo_url: d.data.url })))
  }

  const handleChangeFileThumbnail = async (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setRes((prev) => ({ ...prev, thumbnail_photo: d.data.url })))
  }

  return (
    <CForm className={classNames('row', 'justify-content-between')}>
      <CCol lg={10} className={classNames('d-flex', 'flex-column', 'gap-2', 'pt-2')}>
        <CFormInput
          type={'text'}
          floatingLabel={'Название'}
          value={res.title}
          onChange={(e) => setRes((p) => ({ ...p, title: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Краткое описание'}
          value={res.slogan}
          onChange={(e) => setRes((p) => ({ ...p, slogan: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Адрес'}
          value={res.address}
          onChange={(e) => setRes((p) => ({ ...p, address: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Номер телефона'}
          value={res.phone_number}
          onChange={(e) => setRes((p) => ({ ...p, phone_number: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Долгота,Широта'}
          value={res.address_lonlng}
          onChange={(e) => setRes((p) => ({ ...p, address_lonlng: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'О блюдах'}
          value={res.about_dishes}
          onChange={(e) => setRes((p) => ({ ...p, about_dishes: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'О кухне'}
          value={res.about_kitchen}
          onChange={(e) => setRes((p) => ({ ...p, about_kitchen: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Об особенностях'}
          value={res.about_features}
          onChange={(e) => setRes((p) => ({ ...p, about_features: e.target.value }))}
        />
        <CFormTextarea
          floatingLabel={'О ресторане'}
          value={res.about_text}
          style={{ height: '12rem' }}
          onChange={(e) => setRes((p) => ({ ...p, about_text: e.target.value }))}
        ></CFormTextarea>

        <CFormInput
          type={'text'}
          floatingLabel={'Ключ Remarked'}
          value={res.remarked_token}
          onChange={(e) => setRes((p) => ({ ...p, remarked_token: e.target.value }))}
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Ключ мероприятий Remarked'}
          value={res.remarked_event_token}
          onChange={(e) => setRes((p) => ({ ...p, remarked_event_token: e.target.value }))}
        />

        <CFormInput
          type={'text'}
          floatingLabel={'Ссылка на гл. фото'}
          readOnly
          value={res.thumbnail_photo}
          disabled
        />
        <CFormInput
          type={'text'}
          floatingLabel={'Средний чек'}
          value={res.avg_cheque}
          onChange={(e) => setRes((p) => ({ ...p, avg_cheque: parseInt(e.target.value) || 0 }))}
        ></CFormInput>
        <CFormInput
          type={'text'}
          floatingLabel={'Ссылка на логотип'}
          readOnly
          disabled
          value={res.logo_url}
        />
        <div className={classNames('d-flex', 'flex-column', 'gap-0', 'pt-2')}>
          {cities.length > 0 && (
            <CFormSelect
              label={'Город'}
              value={res.city.id}
              onChange={(e) =>
                setRes((prev) => ({
                  ...prev,
                  // Эту грязь можно сделать красивее через монады
                  city: cities.find((c) => c.id === Number(e.target.value)) || {
                    id: 1,
                    name: '',
                    name_english: '',
                    name_dative: '',
                  },
                }))
              }
            >
              {cities.map((city) => (
                <option value={city.id}>{city.name}</option>
              ))}
            </CFormSelect>
          )}
        </div>
        <div className={classNames('d-flex', 'flex-column', 'gap-0', 'pt-2')}>
          {chefs.length > 0 && (
            <CFormSelect
              label={'Бренд-шеф'}
              value={res.brand_chef.id}
              onChange={(e) =>
                setRes((prev) => ({
                  ...prev,
                  brand_chef: chefs.find((c) => c.id == Number(e.target.value)) || {
                    id: 0,
                    name: '',
                    photo_url: '',
                    about: '',
                  },
                }))
              }
            >
              {chefs.map((chef) => (
                <option
                  value={chef.id}
                  onChange={() => setRes((prev) => ({ ...prev, brand_chef: chef }))}
                >
                  {`${chef.id} | ${chef.name}`}
                </option>
              ))}
            </CFormSelect>
          )}
        </div>
        <div className={classNames('d-flex', 'flex-column', 'gap-0', 'pt-2')}>
          <CFormInput
            type={'file'}
            label={'Загрузка гл. фото'}
            accept={'image/png, image/jpeg, image/jpg'}
            onChange={(e) => handleChangeFileThumbnail(e.target.files)}
          />
        </div>
        <div className={classNames('d-flex', 'flex-column', 'gap-0', 'pt-2')}>
          <CFormInput
            type={'file'}
            label={'Загрузка логотипа'}
            accept={'image/png, image/jpeg, image/jpg'}
            onChange={(e) => handleChangeFileLogo(e.target.files)}
          />
        </div>
        <div className={classNames('d-flex', 'col', 'gap-3')}>
          <CButton color={'success'} onClick={saveChanges}>
            Сохранить
          </CButton>
          <CButton color={'warning'} onClick={() => setRes(restaurant)}>
            Сбросить изменения
          </CButton>
        </div>
      </CCol>
      <CCol lg={2} className={classNames('d-flex', 'flex-column', 'gap-2', 'pt-2')}>
        <CCard>
          <CCardHeader>
            <strong>Главная фотография</strong>
          </CCardHeader>
          <CCardImage src={res.thumbnail_photo} orientation={'bottom'} />
        </CCard>
        <CCard>
          <CCardHeader>
            <strong>Логотип</strong>
          </CCardHeader>
          <CCardImage src={res.logo_url} orientation={'bottom'} />
        </CCard>
      </CCol>
    </CForm>
  )
}
