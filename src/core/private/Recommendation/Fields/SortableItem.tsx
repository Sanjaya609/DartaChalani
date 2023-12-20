import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Form from '@/components/functional/Form/Form'
import { IAddFieldInitialValue } from './schema/field.interface'

const SortableItem = ({ item }: { item: IAddFieldInitialValue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div
      className="group relative"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Form.Input
        disabled
        isRequired
        value={item.fieldControlName}
        errors={{}}
        name="fieldControlName"
        label={item.fieldControlName}
        onChange={() => {}}
      />
    </div>
  )
}

export default SortableItem
