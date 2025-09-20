import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { CForm } from '@coreui/react-pro'
import {
  createBlock,
  createStory,
  deleteBlock,
  deleteStory,
  reorderStory,
  updateBlock,
  updateStory,
} from 'src/dataProviders/stories.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { IStoriesBlock, IStory } from 'src/types/Stories.ts'
import toast from 'react-hot-toast'

import { BlockInfoSection } from './BlockInfoSection.tsx'
import { CitySelectionSection } from './CitySelectionSection.tsx'
import { UserAccessSection } from './UserAccessSection.tsx'
import { StoriesSection } from './StoriesSection.tsx'
import { ActionButtons } from './ActionButtons.tsx'

const BlockForm: FC<{
  currentBlock: [IStoriesBlock, Dispatch<SetStateAction<IStoriesBlock>>]
  id: [number | null, Dispatch<number | null>]
  utilProps: [boolean, () => void]
}> = ({ currentBlock, id, utilProps }) => {
  const [isForAll, setIsForAll] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [openStoryPopup, setOpenStoryPopup] = useState(false)
  const [blockId] = id
  const [isEdit, cancelBlockEdit] = utilProps

  const [block, setBlock] = currentBlock
  const [storiesList, setStoriesList] = useState<IStory[]>(block.stories)
  const [storiesToUpdate, setStoriesToUpdate] = useState<IStory[]>([])
  const [storiesToDelete, setStoriesToDelete] = useState<IStory[]>([])

  const changeBlockName = (e: ChangeEvent<HTMLInputElement>) => {
    setBlock((prev) => ({ ...prev, name: e.target.value }))
  }
  const changeBlockActive = () => {
    setBlock((prev) => ({ ...prev, active: !prev.active }))
  }
  const changeBlockCities = (cityId: number) => {
    setBlock((prev) => ({
      ...prev,
      cities: prev.cities.includes(cityId)
        ? prev.cities.filter((id) => id !== cityId)
        : [...prev.cities, cityId],
    }))
  }
  const changeBlockThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    setBlock((prev) => ({ ...prev, thumbnail: e.target.value }))
  }
  const handleImageChange = (files: FileList | null) => {
    if (!files) return
    uploadFile(files[0]).then((res) => setBlock((prev) => ({ ...prev, thumbnail: res.data.url })))
  }
  const addUser = (userId: number) => {
    setBlock((prev) => ({ ...prev, users: [...prev.users, userId] }))
  }
  const removeUser = (userToDelete: number) => {
    setBlock((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user !== userToDelete),
    }))
  }
  const handleForAllChange = () => {
    setIsForAll(!isForAll)
    if (!isForAll) {
      setBlock((prev) => ({ ...prev, users: [] }))
    }
  }
  const sendStories = async (targetBlockId: number) => {
    const newStories = storiesList.filter((story) => !story.id)
    const tempIdMap = new Map()
    for (const story of newStories) {
      await createStory(story, targetBlockId).then((res) => {
        if (res.data.id && story.tempId) {
          tempIdMap.set(story.tempId, res.data.id)
        }
      })
    }
    return tempIdMap
  }
  const updateStories = async () => {
    for (const story of storiesToUpdate) {
      if (!story.id) return
      await updateStory(story, story.id)
    }
  }

  const deleteStories = async () => {
    for (const story of storiesToDelete) {
      if (!story.id) return
      await deleteStory(story.id)
    }
  }
  const reorderStories = async (targetBlockId: number, tempIdMap?: Map<number, number>) => {
    const storiesWithRealIds = storiesList.map((story) => {
      if (!story.id && story.tempId && tempIdMap?.has(Number(story.tempId))) {
        return {
          ...story,
          id: tempIdMap.get(Number(story.tempId)),
        }
      }
      return story
    })

    const storyIds = storiesWithRealIds
      .map((story) => story.id)
      .filter((id): id is number => id !== null && id !== undefined)
    await reorderStory(
      {
        story_ids: storyIds,
      },
      targetBlockId,
    )
    setStoriesList(storiesWithRealIds)
    setBlock((prev) => ({ ...prev, stories: storiesWithRealIds }))
  }
  const handleSendBlock = () => {
    setIsLoading(true)
    const operation = isEdit
      ? updateBlock({ id: blockId, ...block })
          .then(() => {
            if (blockId !== null) {
              return Promise.all([
                sendStories(blockId).then((tempIdMap) => {
                  return Promise.all([updateStories(), deleteStories()]).then(() =>
                    reorderStories(blockId, tempIdMap),
                  )
                }),
              ])
            }
          })
          .then(() => toast.success('Блок обновлён'))
      : createBlock({ ...block })
          .then((res) => {
            const newBlockId = res.data.id
            if (newBlockId) {
              return sendStories(newBlockId).then((tempIdMap) =>
                reorderStories(newBlockId, tempIdMap),
              )
            }
          })
          .then(() => toast.success('Блок создан'))
    operation
      .catch((e) => toast.error(e))
      .finally(() => {
        setIsLoading(false)
        cancelBlockEdit()
      })
  }
  const handleDeleteBlock = () => {
    if (blockId === null) return
    deleteBlock(blockId)
      .then(() => toast.success('Блок удалён'))
      .catch((e) => toast.error(e))
      .finally(() => cancelBlockEdit())
  }
  useEffect(() => {
    if (block.users !== null) {
      setIsForAll(block.users.length === 0)
    }
  }, [block.users])

  useEffect(() => {
    setStoriesList(block.stories)
  }, [block.stories])

  useEffect(() => {
    setBlock((prev) => ({ ...prev, stories: storiesList }))
  }, [storiesList, setBlock])

  return (
    <CForm>
      <BlockInfoSection
        blockName={block.name}
        onNameChange={changeBlockName}
        isActive={block.active}
        onActiveChange={changeBlockActive}
        thumbnail={block.thumbnail || ''}
        onThumbnailChange={changeBlockThumbnail}
        onImageUpload={handleImageChange}
      />
      <CitySelectionSection selectedCities={block.cities || []} onCityToggle={changeBlockCities} />
      <UserAccessSection
        isForAll={isForAll}
        onForAllChange={handleForAllChange}
        users={block.users || []}
        onAddUser={addUser}
        onRemoveUser={removeUser}
      />
      <StoriesSection
        stories={storiesList}
        popup={[openStoryPopup, setOpenStoryPopup]}
        onStoriesChange={setStoriesList}
        onUpdateStories={setStoriesToUpdate}
        onDeleteStories={setStoriesToDelete}
      />
      <ActionButtons
        isEdit={isEdit}
        isActive={block.name !== '' && block.thumbnail !== ''}
        isLoading={isLoading}
        onCancel={cancelBlockEdit}
        onSave={handleSendBlock}
        onDelete={handleDeleteBlock}
      />
    </CForm>
  )
}

export default BlockForm
