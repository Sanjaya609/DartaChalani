import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Form from '@/components/functional/Form/Form'
import { IAddFieldInitialValue } from '../schema/field.interface'
import { Box, Button, Icon } from '@/components/ui'
import {
  HandGrabbing,
  Pencil,
  Trash,
  UploadSimple,
  Warning,
} from 'phosphor-react'
import Modal from '@/components/ui/Modal/Modal'
import { useDeleteFieldById } from '../services/fields.query'
import { useTranslation } from 'react-i18next'
import ValidationSetup from './ValidationSetup'
import { useBoolean } from 'usehooks-ts'
import { validationSetupInitialValues } from '../schema/validations.schema'
import { getTextByLanguage } from '@/lib/i18n/i18n'

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

  const [selectedId, setSelectedId] = useState<string | number>('')
  const [selectedFieldType, setSelectedFieldType] = useState('')
  const setOrRemoveselectedId = (id?: string | number) =>
    setSelectedId(id || '')

  const { value: openValidationModal, toggle: toggleValidationModal } =
    useBoolean()
  const [initialValues, setInitialValues] = useState(
    validationSetupInitialValues
  )

  const { mutate: deleteById, isLoading: deleteByIdLoading } =
    useDeleteFieldById()

  const handleDeleteById = () => {
    deleteById(selectedId, {
      onSuccess: () => {
        setOrRemoveselectedId()
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
          setSelectedId(item?.id!)
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

      <Button
        variant="danger"
        size="xs"
        type="button"
        icons="icons"
        className="z-40 whitespace-nowrap rounded border border-gray-80"
        onClick={() => {
          setSelectedId(item.id!)
          setSelectedFieldType(item.fieldType.toUpperCase())
          toggleValidationModal()
        }}
      >
        <Icon icon={Warning} />
      </Button>
    </div>
  )

  const renderField = (item: IAddFieldInitialValue) => {
    const ComponentToRender = Form[item.fieldType]

    return (
      <ComponentToRender
        options={
          item.dropDownResponse?.dropDownDetailResponseDtoList?.map((data) => ({
            label: data.descriptionEn,
            value: data.id,
            labelNp: data.descriptionNp,
          })) || []
        }
        cols={5}
        rows={5}
        disabled
        isRequired={
          item?.fieldValidationList?.filter(
            (validation) => validation?.validationType === 'REQUIRED'
          ).length! > 0
        }
        value=""
        checked={true}
        errors={{}}
        name="fieldControlName"
        label={getTextByLanguage(item.labelNameEnglish, item.labelNameNepali)}
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

      <Modal
        open={!!selectedId}
        toggleModal={setOrRemoveselectedId}
        size="md"
        title={getTextByLanguage('Delete Field', 'फिल्ड मेटाउन')}
        saveBtnProps={{
          btnAction: handleDeleteById,
          loading: deleteByIdLoading,
          btnTitle: t('btns.delete'),
        }}
        cancelBtnProps={{
          btnAction: () => {
            setOrRemoveselectedId()
          },
        }}
      >
        {getTextByLanguage(
          'Are you sure to delete this Field?',
          'के तपाइँ यो फिल्ड मेटाउन निश्चित हुनुहुन्छ?'
        )}
      </Modal>

      {openValidationModal && selectedId && (
        <ValidationSetup
          openValidationModal={openValidationModal}
          toggleValidationModal={toggleValidationModal}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          fieldId={selectedId}
          fieldType={selectedFieldType}
        />
      )}
    </div>
  )
}

export default SortableField
