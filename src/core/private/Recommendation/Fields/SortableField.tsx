import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Form, { FormKeyType } from '@/components/functional/Form/Form'
import { IAddFieldInitialValue } from './schema/field.interface'
import { Button, Icon } from '@/components/ui'
import { HandGrabbing, Pencil, Trash } from 'phosphor-react'
import Modal from '@/components/ui/Modal/Modal'
import { useDeleteFieldById } from './services/fields.query'
import { useTranslation } from 'react-i18next'

const SortableField = ({
  item,
  setEditId,
}: {
  item: IAddFieldInitialValue
  setEditId: (id: number) => void
}) => {
  const { t } = useTranslation()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item?.id! })
  const style = {
    opacity: isDragging ? 0.4 : undefined,
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
    <div className="absolute right-0 top-1 mr-3 hidden space-x-2 group-hover/group:flex">
      <Button
        variant="primary"
        size="xs"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        onClick={() => {
          setEditId(parseInt(item?.id.toString()))
        }}
      >
        <Icon icon={Pencil} />
      </Button>

      <Button
        variant="danger"
        size="xs"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
        onClick={() => {
          setDeleteId(item?.id!)
        }}
      >
        <Icon icon={Trash} />
      </Button>

      <Button
        {...listeners}
        ref={setNodeRef}
        variant="warning"
        size="xs"
        type="button"
        icons="icons"
        className="z-40 ml-4 whitespace-nowrap rounded border border-gray-80"
      >
        <Icon icon={HandGrabbing} />
      </Button>
    </div>
  )

  const renderField = (item: IAddFieldInitialValue) => {
    let camelCaseFieldType: FormKeyType = (item.fieldType
      .charAt(0)
      .toUpperCase() +
      item?.fieldType
        .toLowerCase()
        .replace(/_(\w)/g, (match, group1) => group1.toUpperCase())
        .slice(1)) as FormKeyType
    if (camelCaseFieldType.includes('Radio')) {
      camelCaseFieldType = 'Radio'
    }
    const ComponentToRender = Form[item.fieldType]

    return (
      <ComponentToRender
        options={[
          { label: 'Yes', value: true },
          { label: 'No', value: true },
        ]}
        cols={5}
        rows={5}
        disabled
        isRequired={item.isValidationRequired}
        value=""
        checked={true}
        errors={{}}
        name="fieldControlName"
        label={item.labelNameEnglish}
        onChange={() => {}}
      />
    )
  }

  return (
    <div
      className="group/group relative p-2 hover:rounded-md hover:border hover:bg-gray-50"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      {renderActionButtons(item)}
      {renderField(item)}
      {/* <Form.Input
        disabled
        isRequired
        value=""
        errors={{}}
        name="fieldControlName"
        label={item.labelNameEnglish}
        onChange={() => {}}
      /> */}

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
        Are you sure to delete this Field
      </Modal>
    </div>
  )
}

export default SortableField
