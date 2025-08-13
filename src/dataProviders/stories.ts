import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IStoriesBlock, IStory } from 'src/types/Stories.ts'

export const getStoriesList = async (blockId: number) => {
  return await axios.get<IStory[]>(`${BASEURL}/stories/blocks/${blockId}/stories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const createStory = async (data: IStory, block_id: number) => {
  return await axios.post<IStory>(`${BASEURL}/stories/blocks/${block_id}/stories`, data, {
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

export const getBlockById = async (id: number) => {
  return await axios.get<IStoriesBlock>(`${BASEURL}/stories/blocks/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const createBlock = async (data: IStoriesBlock) => {
  return await axios.post<IStoriesBlock>(`${BASEURL}/stories/blocks`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const updateBlock = async (data: IStoriesBlock) => {
  return await axios.patch<IStoriesBlock>(`${BASEURL}/stories/blocks${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
