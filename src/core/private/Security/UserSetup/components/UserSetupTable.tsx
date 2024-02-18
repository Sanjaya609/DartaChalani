import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useSendResetPasswordLink } from '@/service/oauth/oauth.query'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IUserSetupInitialValue,
  IUserSetupResponse,
} from '../schema/user-setup.interface'
import {
  useChangeUserStatus,
  useGetAllUser,
} from '../services/user-setup.query'

interface IUserSetupTableProps {
  initialValues: IUserSetupInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<IUserSetupInitialValue>>
}

const UserSetupTable = (props: IUserSetupTableProps) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const [currentSelectedUser, setCurrentSelectedUser] =
    useState<IUserSetupResponse | null>(null)

  const { t } = useTranslation()
  const { data: sectorData, isFetching } = useGetAllUser()
  const { mutate: changeUserStatus, isLoading: changeUserStatusLoading } =
    useChangeUserStatus()
  const { mutate: sendResetPasswordLink, isLoading: resetPasswordLoading } =
    useSendResetPasswordLink()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const setOrRemoveCurrentSelectedUser = (user?: IUserSetupResponse) =>
    setCurrentSelectedUser(user || null)

  const handleEditClick = ({
    email,
    fullNameEn,
    fullNameNp,
    username,
    id,
    roleId,
  }: IUserSetupResponse) => {
    setInitialValues({
      id,
      email,
      fullNameEn,
      fullNameNp,
      password: '',
      roleId,
      username,
    })
  }

  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeUserStatus(
        { userId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const handleSendResetPasswordLink = () => {
    if (currentSelectedUser) {
      sendResetPasswordLink(
        { email: currentSelectedUser.email },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedUser()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<IUserSetupResponse>[]>(
    () => [
      {
        header: t('security.userSetup.fullNameEn'),
        accessorKey: 'fullNameEn',
      },
      {
        header: t('security.userSetup.fullNameNp'),
        accessorKey: 'fullNameNp',
      },
      {
        header: t('security.userSetup.username'),
        accessorKey: 'username',
      },
      {
        header: t('security.userSetup.email'),
        accessorKey: 'email',
      },
      {
        header: t('security.userSetup.roleId'),
        accessorKey: getTextByLanguage('roleNameEnglish', 'roleNameNepali'),
      },
      {
        header: t('security.userSetup.status'),
        accessorKey: 'isDisabled',
        cell: ({ row: { original } }) => (
          <Switch
            checked={original.isDisabled}
            onChange={() => {
              setOrRemoveCurrentSelectedId(original.id)
            }}
          />
        ),
      },
      {
        header: t('actions'),
        sticky: 'right',
        id: 'action',
        cell: ({ row: { original } }) => (
          <TableAction
            handleEditClick={() => {
              handleEditClick(original)
            }}
            // otherActionsComp={
            //   <>
            //     {initData?.user?.roleType === 'ADMIN' && (
            //       <li className={tableActionList}>
            //         <span
            //           className="group relative"
            //           onClick={() => {
            //             setOrRemoveCurrentSelectedUser(original)
            //           }}
            //         >
            //           <MailPlus className={tableActionIcon} size={20} />
            //           <Box as="span" className={tableActionTooltip}>
            //             {t('security.userSetup.modal.resetPassword.icon')}
            //           </Box>
            //         </span>
            //       </li>
            //     )}
            //   </>
            // }
          />
        ),
      },
    ],
    [t]
  )

  return (
    <>
      <DataTable
        isLoading={isFetching}
        columns={columns}
        data={sectorData || []}
        canSearch
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('security.userSetup.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeUserStatusLoading,
        }}
      >
        {t('security.userSetup.modal.status.description')}
      </Modal>

      <Modal
        open={!!currentSelectedUser}
        toggleModal={setOrRemoveCurrentSelectedUser}
        size="md"
        title={t('security.userSetup.modal.resetPassword.title')}
        saveBtnProps={{
          btnAction: handleSendResetPasswordLink,
          loading: resetPasswordLoading,
        }}
      >
        {t('security.userSetup.modal.resetPassword.description', {
          email: currentSelectedUser?.email,
        })}
      </Modal>
    </>
  )
}

export default UserSetupTable
