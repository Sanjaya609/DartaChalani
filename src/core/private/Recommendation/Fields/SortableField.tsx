import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Form from '@/components/functional/Form/Form'
import { IAddFieldInitialValue } from './schema/field.interface'
import { Button, Icon } from '@/components/ui'
import { Pencil, Trash } from 'phosphor-react'
import Modal from '@/components/ui/Modal/Modal'
import { useDeleteFieldById } from './services/fields.query'
import { useTranslation } from 'react-i18next'

const SortableField = ({ item, setEditId }: { 
  item: IAddFieldInitialValue
  setEditId: (id: number) => void;
 }) => {
  const { t } = useTranslation()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const [deleteId, setDeleteId] = useState<string | number>('')
  const setOrRemoveDeleteId = (id?: string | number) => setDeleteId(id || '')

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
    <div className="absolute right-0 top-4 mr-3 hidden space-x-2 group-hover/group:flex">
      <Button
        variant="success"
        size="sm"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        onClick={() => {
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

  return (
    <div
      className="group/group relative hover:rounded-md hover:border p-2 hover:bg-gray-50"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {renderActionButtons(item)}
      <Form.Input
        disabled
        isRequired
        value=""
        errors={{}}
        name="fieldControlName"
        label={item.labelNameEnglish}
        onChange={() => {}}
      />
    </div>
  )
}

export default SortableField
