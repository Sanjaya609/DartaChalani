import { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { Button, Flexbox, Grid, Icon } from '@/components/ui'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import SortableItem from './SortableField'
import { Text } from '@/components/ui/core/Text'
import { Pencil, Trash, HandGrabbing, Plus } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import AddField from './AddField'
import { IAddGroupResponse } from './schema/group.interface'
import { useUpdateFieldOrder } from './services/fields.query'
import Modal from '@/components/ui/Modal/Modal'
import { useDeleteGroupById } from './services/groups.query'

const SortableGroup = ({
  item,
  toggleGroupForm,
}: {
  item: IAddGroupResponse
  toggleGroupForm: (groupData?: IAddGroupResponse) => void
}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState(item.fieldResponseList!)

  const [showAddOrEditForm, setShowAddOrEditForm] = useState(false)
  const [editId, setEditId] = useState<number | null>()

  const [deleteId, setDeleteId] = useState<string | number>('')
  const setOrRemoveDeleteId = (id?: string | number) => setDeleteId(id || '')

  const { mutate: updateFieldOrder, isLoading: createGroupLoading } =
    useUpdateFieldOrder()

    const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteGroupById()

  const handleDeleteById = () => {
    deleteById(deleteId, {
      onSuccess: () => {
        setOrRemoveDeleteId()
      },
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: item.id })
  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id === over.id) {
      return
    }

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      let newOrder = arrayMove(items, oldIndex, newIndex)
      let newOrderPayload = newOrder?.map((order,index) => ({
        fieldGroupId: item.id,
        id: order.id,
        orderNo: index
      }))

      updateFieldOrder(newOrderPayload)
      // Update the items array when an item is dropped
      setItems(newOrder)
    }
  }

  const renderGroupActionButtons = (item: IAddGroupResponse) => (
    <div className="absolute right-0 top-[-10px] mr-3 hidden flex-row-reverse space-x-2 group-hover/field:flex">
        <Button
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          variant="warning"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 ml-2 whitespace-nowrap rounded border border-gray-80"
        >
          <Icon icon={HandGrabbing} />
        </Button>

        <Button
          variant="danger"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 whitespace-nowrap rounded border border-gray-80"
          onClick={() => {
            setDeleteId(item.id)
          }}
        >
          <Icon icon={Trash} />
        </Button>

        <Button
          variant="primary"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 whitespace-nowrap rounded border border-gray-80"
          onClick={() => {
            toggleGroupForm(item)
          }}
        >
          <Icon icon={Pencil} />
        </Button>

        <Button
          variant="success"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 whitespace-nowrap rounded border border-gray-80"
          onClick={() => {
            setShowAddOrEditForm(true)
          }}
        >
          <Icon icon={Plus} />
        </Button>
      </div>
  )

  useEffect(() => {
    item.fieldResponseList && setItems(item.fieldResponseList)
  }, [item])

  return (
    <div className="relative mb-3 bg-gray-200">
      <div 
        className="relativ group/field hover:rounded-md hover:border hover:border-rose-500 p-2"
        ref={setNodeRef}
        {...attributes}
        style={style}
      >
      {renderGroupActionButtons(item)}
        <Flexbox
          align="center"
          justify="space-between"
          className={`mt-3 w-full mb-2 ml-2 ${item.showInForm ? "" : "line-through text-zinc-400"}`}
        >
          <Text variant="h5" typeface="semibold">
            {item.nameEnglish}
          </Text>
        </Flexbox>

        <Grid sm={'sm:grid-cols-12'} gap="gap-4">
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
                    className=" relative"
                    key={item.id}
                  >
                    <SortableItem key={item.id} item={item} setEditId={(id: number) => {
                      setEditId(id)
                      setShowAddOrEditForm(true)
                    }} />
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
            className="mt-8 rounded-3xl bg-gray-50 ring-1 ring-gray-200"
          >
            <Grid.Col sm={'sm:col-span-12'} className="group relative p-3">
              <AddField
                fieldId={editId!}
                setFieldId={setEditId}
                groupId={item.id}
                setShowAddOrEditForm={setShowAddOrEditForm}
              />
            </Grid.Col>
          </Grid>
        )}
      </div>

      <Modal
        open={!!deleteId}
        toggleModal={setOrRemoveDeleteId}
        size="md"
        title="Delete Field"
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
        Are you sure to delete this Group
      </Modal>
    </div>
  )
}

export default SortableGroup
