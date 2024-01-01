import { useEffect, useState } from 'react'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import SectionHeader from '@/components/functional/SectionHeader'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { addFieldInitialValues } from './schema/field.schema'
import { Button, Flexbox, Grid, Icon } from '@/components/ui'
import { decodeParams } from '@/utility/route-params'
import {
  useDeleteFieldById,
  useGetAllFieldByRecommendationId,
} from '../ConfigureRecommendation/services/fields.query'
import SortableItem from './SortableItem'
import AddField from './AddField'
import { useGetRecommendationDetailById } from '../AddRecommendation/services/add-recommendation.query'
import { Minus, Pencil, Plus, Trash } from 'phosphor-react'
import { IAddFieldInitialValue } from './schema/field.interface'
import Modal from '@/components/ui/Modal/Modal'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'

const FieldSetup = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const [showAddOrEditForm, setShowAddOrEditForm] = useState(false)
  const [editId, setEditId] = useState<number>()
  const [items, setItems] = useState(addFieldInitialValues)
  const [deleteId, setDeleteId] = useState<string | number>('')
  const setOrRemoveDeleteId = (id?: string | number) => setDeleteId(id || '')

  const params = useParams()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const recommendationId = decodeParams<string>(params?.id)
  const { data: recommendationDetails } = useGetRecommendationDetailById(
    recommendationId ?? ''
  )

  const {
    data: allFiledByRecommendationIdList = [],
    isFetching: allFiledByRecommendationFetching,
  } = useGetAllFieldByRecommendationId(recommendationId)

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id === over.id) {
      return
    }

    if (active.id !== over.id) {
      // Update the items array when an item is dropped
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteFieldById()

  const handleDeleteById = () => {
    deleteById(deleteId, {
      onSuccess: () => {
        setOrRemoveDeleteId()
      },
    })
  }

  const renderActionButtons = (item: IAddFieldInitialValue) => (
    <div className="absolute right-0 top-4 mr-5 mt-2 hidden space-x-2 group-hover:flex">
      <Button
        variant="success"
        size="sm"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        onClick={() => {
          setShowAddOrEditForm(true)
          setEditId(item.id)
        }}
      >
        <Icon icon={Pencil} />
      </Button>

      <Button
        variant="danger"
        size="sm"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        onClick={() => setDeleteId(item.id)}
      >
        <Icon icon={Trash} />
      </Button>

      <Modal
        open={!!deleteId}
        toggleModal={setOrRemoveDeleteId}
        size="md"
        title={t('recommendation.deleteModal.title')}
        saveBtnProps={{
          btnAction: handleDeleteById,
          loading: deleteByIdLoading,
          btnTitle: t('btns.delete'),
        }}
        cancelBtnProps={{
          btnAction: () => {
            setOrRemoveDeleteId()
          },
        }}
      >
        {t('recommendation.deleteModal.description')}
      </Modal>
    </div>
  )

  const navigate = useNavigate()
  const navigateToRecommendationList = () => {
    navigate(privateRoutePath.recommendation.base)
  }

  useEffect(() => {
    if (allFiledByRecommendationIdList) {
      setItems(allFiledByRecommendationIdList)
    }
  }, [allFiledByRecommendationFetching])

  return (
    <>
      <SectionHeader title={recommendationDetails?.nameEnglish} backAction={navigateToRecommendationList} />
      <Flexbox
        align="center"
        justify="space-between"
        className='w-full mt-3'
      >
        <div></div>
        <Button
            size="md"
            type="button"
            icons="icons"
            className="ml-4 mr-16 whitespace-nowrap border border-gray-80"
            onClick={() => {
              setShowAddOrEditForm(true)
            }}
          >Add Field</Button>
      </Flexbox>
      <ContainerLayout className="scrollbars grow mt-[-15px]">
        <Card className="h-full">
          <Grid sm={'sm:grid-cols-12'} gap="gap-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragCancel={() => console.log('Drag cancelled')}
            >
              <SortableContext items={items} strategy={rectSortingStrategy}>
                {items.map((item) => (
                  <>
                    <Grid.Col
                      sm={'sm:col-span-4'}
                      className="group relative p-3 hover:bg-gray-50 hover:rounded-3xl"
                      key={item.id}
                    >
                      {renderActionButtons(item)}
                      <SortableItem key={item.id} item={item} />
                    </Grid.Col>
                  </>
                ))}
              </SortableContext>
            </DndContext>
          </Grid>

          {showAddOrEditForm && (
            <Grid
              sm={'sm:grid-cols-12'}
              gap="gap-6"
              className="mt-8 rounded-3xl ring-1 ring-gray-200 bg-gray-50"
            >
              <Grid.Col sm={'sm:col-span-12'} className="group relative p-3">
                <AddField editId={editId} formId={recommendationId!} setShowAddOrEditForm={setShowAddOrEditForm} />
              </Grid.Col>
            </Grid>
          )}
        </Card>
      </ContainerLayout>
    </>
  )
}

export default FieldSetup
