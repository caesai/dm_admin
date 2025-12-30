import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { uploadFile } from 'src/dataProviders/s3.ts'
import {
  getMailingPreview,
  sendMailingContent,
  sendMailingGroup,
} from 'src/dataProviders/mailing.ts'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { IMedia } from 'src/types/Media.ts'

export const useNotificationPanel = () => {
  const [testUserName, setTestUserName] = useState<string>('')
  const [editorContent, setEditorContent] = useState<string>('')
  const [groupNotificationIsInProgress, setGroupNotificationIsInProgress] = useState<boolean>(false)
  const [media, setMedia] = useState<IMedia[]>([])
  const [imageUploadInProgress, setImageUploadInProgress] = useState<boolean>(false)
  const [videoUploadInProgress, setVideoUploadInProgress] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('')
  const [buttonUrl, setButtonUrl] = useState<string>('')
  const [currentRestaurantIds, setRestaurantsIds] = useState<number[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
  const [isActiveNotificationButton, setIsActiveNotificationButton] = useState<boolean>(false)
  const [refreshHistoryKey, setRefreshHistoryKey] = useState<number>(0)
  const [documentFile, setDocumentFile] = useState<IMedia | null>(null)
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [previewText, setPreviewText] = useState<string>('')

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleSuccess = () => {
    setRefreshHistoryKey((key) => key + 1)
  }

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const sendMailing = async (
    users_ids: Array<string>,
    text: string,
    mediaList: IMedia[],
    documentFile: IMedia | null,
    button_text: string,
    button_url: string,
  ) => {
    try {
      const btnText = button_text || undefined
      const btnUrl = button_url || undefined
      const mediaItems = mediaList.map((item) => [item.url, item.type, item.name])

      if (documentFile) {
        await sendMailingContent({
          users_ids: users_ids,
          restaurant_ids: currentRestaurantIds.includes(0) ? [] : currentRestaurantIds,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
          media_url: documentFile.url,
          media_type: documentFile.type,
          media_filename: documentFile.name,
        })
      } else if (mediaList.length === 1) {
        await sendMailingContent({
          users_ids: users_ids,
          restaurant_ids: currentRestaurantIds.includes(0) ? [] : currentRestaurantIds,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
          media_url: mediaList[0].url,
          media_type: mediaList[0].type,
          media_filename: mediaList[0].name,
        })
      } else if (mediaList.length > 1) {
        await sendMailingGroup({
          users_ids: users_ids,
          restaurant_ids: currentRestaurantIds.includes(0) ? [] : currentRestaurantIds,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
          media_items: mediaItems,
        })
      } else {
        await sendMailingContent({
          users_ids: users_ids,
          restaurant_ids: currentRestaurantIds.includes(0) ? [] : currentRestaurantIds,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
        })
      }
      handleSuccess()
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при отправке рассылки: ' + error)
    }
  }

  const notifyGroup = async () => {
    try {
      setGroupNotificationIsInProgress(true)
      if (!testUserName) {
        toast.error('Отсутствует Telegram ID для теста.')
        return
      }
      if (!editorContent && media.length === 0 && !documentFile) {
        toast.error('Отсутствует контент для рассылки.')
        return
      }

      await sendMailing([testUserName], editorContent, media, documentFile, buttonText, buttonUrl)
      toast.success('Тестовая рассылка успешно отправлена.')
    } catch (error) {
      console.log(error)
      toast.error('Ошибка в тестовой рассылке: ' + error)
    } finally {
      setGroupNotificationIsInProgress(false)
      setIsActiveNotificationButton(true)
    }
  }

  const notifyAll = async () => {
    try {
      await sendMailing([], editorContent, media, documentFile, buttonText, buttonUrl)
      toast.success('Рассылка успешно отправлена.')
    } catch (error) {
      console.log(error)
      toast.error('Ошибка в рассылке: ' + error)
    }
  }

  const previewMailing = () => {
    getMailingPreview(currentRestaurantIds.includes(0) ? null : currentRestaurantIds)
      .then((res) => setPreviewText(`Количество получателей: ${res.data.count}`))
      .catch(() => toast.error('Произошла ошибка'))
  }

  const handlePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUploadInProgress(true)
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const fileId = `photo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        const fileName = file.name

        const res = await uploadFile(file)
        setMedia((prev) => [
          ...prev,
          {
            id: fileId,
            name: fileName,
            url: res.data.url,
            type: 'photo',
          },
        ])
        if (imageInputRef.current) {
          imageInputRef.current.value = ''
        }
      }
    } catch (error) {
      toast.error('Ошибка при загрузке изображения')
      console.log(error)
    } finally {
      setImageUploadInProgress(false)
    }
  }

  const handleVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setVideoUploadInProgress(true)
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const fileId = `video-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        const fileName = file.name

        const res = await uploadFile(file)
        setMedia((prev) => [
          ...prev,
          {
            id: fileId,
            name: fileName,
            url: res.data.url,
            type: 'video',
          },
        ])
        if (videoInputRef.current) {
          videoInputRef.current.value = ''
        }
      }
    } catch (error) {
      toast.error('Ошибка при загрузке видео')
      console.log(error)
    } finally {
      setVideoUploadInProgress(false)
    }
  }

  const handleDocument = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const fileId = `document-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        const fileName = file.name

        const res = await uploadFile(file)
        setDocumentFile({
          id: fileId,
          name: fileName,
          url: res.data.url,
          type: 'document',
        })
      } else {
        setDocumentFile(null)
      }
    } catch (error) {
      toast.error('Не удалось загрузить документ')
      setDocumentFile(null)
      console.log(error)
    }
  }

  const setFileType = (type: string) => {
    switch (type) {
      case 'photo':
        return 'Изображение'
      case 'video':
        return 'Видео'
      case 'document':
        return 'Документ'
      default:
        return 'Ошибка'
    }
  }

  const handleDeleteMedia = (id: string) => {
    setMedia((prev) => prev.filter((i) => i.id !== id))
  }

  const moveMediaUp = (index: number) => {
    if (index <= 0) return

    setMedia((prev) => {
      const newMedia = [...prev]
      ;[newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]]
      return newMedia
    })
  }

  const moveMediaDown = (index: number) => {
    if (index >= media.length - 1) return

    setMedia((prev) => {
      const newMedia = [...prev]
      ;[newMedia[index], newMedia[index + 1]] = [newMedia[index + 1], newMedia[index]]
      return newMedia
    })
  }

  const changeRestaurantIds = (options: Array<{ value: string | number }>) => {
    const restaurantsList = options.map((option) => Number(option.value))
    setRestaurantsIds(restaurantsList)
  }

  const currentRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => currentRestaurantIds.includes(restaurant.id))
  }, [restaurants, currentRestaurantIds])

  useEffect(() => {
    setIsActiveNotificationButton(false)
  }, [editorContent, media, documentFile, buttonText, buttonUrl])

  useEffect(() => {
    loadRestaurants()
  }, [])

  return {
    testUserName,
    setTestUserName,
    editorContent,
    setEditorContent,
    groupNotificationIsInProgress,
    media,
    imageUploadInProgress,
    videoUploadInProgress,
    buttonText,
    setButtonText,
    buttonUrl,
    setButtonUrl,
    currentRestaurantIds,
    isPopupOpen,
    setIsPopupOpen,
    isActiveNotificationButton,
    refreshHistoryKey,
    documentFile,
    restaurants,
    previewText,
    imageInputRef,
    videoInputRef,
    handlePhoto,
    handleVideo,
    handleDocument,
    setFileType,
    handleDeleteMedia,
    moveMediaUp,
    moveMediaDown,
    changeRestaurantIds,
    currentRestaurants,
    notifyGroup,
    notifyAll,
    previewMailing,
  }
}
