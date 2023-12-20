import React from 'react'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grid, Icon } from '@/components/ui'
import Form from '@/components/functional/Form/Form'
import { IAddFieldInitialValue } from './schema/field.interface'
import { Pencil, Trash } from 'phosphor-react'

const SortableItem = ({ item }: { item: IAddFieldInitialValue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <Grid.Col sm={'sm:col-span-6'} className="p-3"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="relative group">
        <Form.Input
          disabled
          isRequired
          value={item.fieldControlName}
          errors={{}}
          name="fieldControlName"
          label={item.fieldControlName}
          onChange={() => {}}
        />

        <div className="hidden absolute top-0 right-0 space-x-2 mt-2 mr-2 group-hover:flex">
          <button type='button' onClick={() => {console.log("hellooooo")}} className="bg-green-500 text-white px-3 py-2 rounded z-40"><Icon icon={Pencil} /></button>
          <button type='button' onClick={() => console.log("hellooooo")} className="bg-red-500 text-white px-3 py-2 rounded"><Icon icon={Trash} /></button>
        </div>
      </div>
    </Grid.Col>
  )
}

export default SortableItem