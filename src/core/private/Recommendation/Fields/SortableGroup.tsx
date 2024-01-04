import { useState } from 'react'
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
import SortableItem from './SortableItem'
import { IAddFieldInitialValue } from './schema/field.interface'
import { Text } from '@/components/ui/core/Text'
import Modal from '@/components/ui/Modal/Modal'
import { useDeleteFieldById } from './services/fields.query'
import { Pencil, Trash, HandGrabbing, Plus } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import AddField from './AddField'
import { IAddGroupResponse } from './schema/group.interface'

const SortableGroup = ({
  item,
  toggleGroupForm,
}: {
  item: IAddGroupResponse;
  toggleGroupForm:  (groupData?: IAddGroupResponse) => void
}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([
    {
      id: 1,
      dropDownId: "",
      fieldControlName: "name",
      fieldType: "INPUT",
      isValidationRequired: true,
      labelNameEnglish: "Name",
      labelNameNepali: "नाम",
      className: "",
      groupingId: 1
    },
    {
      id: 2,
      dropDownId: "",
      fieldControlName: "gender",
      fieldType: "INPUT",
      isValidationRequired: true,
      labelNameEnglish: "Gender",
      labelNameNepali: "लिङ्ग",
      className: "",
      groupingId: 1
    },
])
  // const [items, setItems] = useState(item.fieldResponseList)
  const [showAddOrEditForm, setShowAddOrEditForm] = useState(false)
  const [editId, setEditId] = useState<number>()

  const [deleteId, setDeleteId] = useState<string | number>('')
  const setOrRemoveDeleteId = (id?: string | number) => setDeleteId(id || '')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )
  const { attributes, listeners, setNodeRef, transform, transition,setActivatorNodeRef  } =
    useSortable({ id: item.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

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
    <div className="absolute right-0 top-4 mr-3  hidden space-x-2 group-hover:flex">
      <Button
        variant="success"
        size="sm"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        onClick={() => {
          // setShowAddOrEditForm(true)
          // setEditId(item.id)
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

  return (
    <div className='bg-gray-50 mb-3 group relative'>
      <div className="flex flex-row-reverse absolute right-0 mr-3 hidden top-[-20px] space-x-2 group-hover:flex">
        <Button {...listeners} {...attributes} ref={setNodeRef}
          variant="secondary"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        >
          <Icon icon={HandGrabbing} />
        </Button>

        <Button 
          variant="secondary"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
          onClick={() => {
            toggleGroupForm(item)
          }}
        >
          <Icon icon={Pencil} />
        </Button>
        
        <Button 
          variant="secondary"
          size="sm"
          type="button"
          icons="icons"
          className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
          onClick={() => {
            setShowAddOrEditForm(true)
          }}
        >
          <Icon icon={Plus} />
        </Button>
      </div>

      <div
        className="group relative p-3"
        style={style}
      >
        <Flexbox align="center" justify="space-between" className="mt-3 w-full ">
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
                    className="group relative hover:rounded-3xl hover:bg-gray-50"
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
            className="mt-8 rounded-3xl bg-gray-50 ring-1 ring-gray-200"
          >
            <Grid.Col sm={'sm:col-span-12'} className="group relative p-3">
              <AddField
                fieldId={editId}
                groupId={item.id}
                setShowAddOrEditForm={setShowAddOrEditForm}
              />
            </Grid.Col>
          </Grid>
        )}
      </div>
    </div>
    // </Flexbox>
  )
}

export default SortableGroup
