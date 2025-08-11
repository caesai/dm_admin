import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IStoriesBlock, IStory } from 'src/types/Stories.ts'

export const getStoriesList = async () => {
  return await axios.get<IStory[]>(`${BASEURL}/stories/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getBlocksList = async () => {
  return await axios.get<IStoriesBlock[]>(`${BASEURL}/stories/blocks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
