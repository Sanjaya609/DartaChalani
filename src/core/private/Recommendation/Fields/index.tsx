import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  useSortable,
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SectionHeader from '@/components/functional/SectionHeader'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { addFieldInitialValues } from './schema/field.schema'
import { IAddFieldInitialValue } from './schema/field.interface'
import { Button, Grid } from '@/components/ui'

const FieldSetup = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  const [items, setItems] = useState(addFieldInitialValues)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id === over.id) {
      return
    } else if (active.id !== over.id) {
      // Update the items array when an item is dropped
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <SectionHeader title={'kjkjk'} />

      <ContainerLayout stretch>
        <FlexLayout direction="row">
          <div className="w-4/5 divide-x-[3px]">
            <h2>Add from here</h2>
            <Button onClick={() => {}}>Save</Button>
          </div>

          <form className="ml-3 border border border-primary">
            <Grid sm={'sm:grid-cols-12'} gap="gap-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragCancel={() => console.log('Drag cancelled')}
              >
                <SortableContext items={items} strategy={rectSortingStrategy}>
                  <ul>
                    {items.map((item, index) => (
                      <SortableItem key={item.id} item={item} />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </Grid>
          </form>
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

const SortableItem = ({ item }: { item: IAddFieldInitialValue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <li
      className="p-3"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {/* {item.fieldControlName} */}

      <Grid.Col sm={'sm:col-span-6'}>
        <label>{item.fieldControlName}</label>
        <input type="text" value={item.fieldControlName} />
      </Grid.Col>
    </li>
  )
}

export default FieldSetup
