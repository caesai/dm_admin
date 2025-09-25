import { IRestaurantWCity } from 'src/types/Restaurant.ts'

const parser = new DOMParser()

export const renderHTMLContent = (html: string | null) => {
  if (!html) return 'Текст отсутствует'

  const formattedHtml = html.replace(/\n/g, '<br>')
  const doc = parser.parseFromString(formattedHtml, 'text/html')
  return <div dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />
}

export const getCityOrAddress = (restaurant: IRestaurantWCity | undefined) => {
  if (restaurant?.title === 'Smoke BBQ' && restaurant?.city.name === 'Санкт-Петербург') {
    return restaurant?.address
  }
  return restaurant?.city.name
}

export const getRestaurantCity = (restaurants: IRestaurantWCity[], restaurantId: number) => {
  const restaurant = restaurants.find((r) => r.id === restaurantId)
  return getCityOrAddress(restaurant)
}
