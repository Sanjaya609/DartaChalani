import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ModuleSchemaData, ModuleSchemaResponse } from './schema';
import { UseModuleStatus, useModuleData } from './query';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { Switch } from '../../../../components/core/FormElement';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import Table from '../../../../components/Table/DataTable';
import { TableAction } from '../../../../components/Table/TableComponent';
import i18next from 'i18next';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';

interface ModuleTableProps {
  toggle?: () => void;
  setFormData: Dispatch<SetStateAction<ModuleSchemaData>>;
}
function ModuleTabel(props: ModuleTableProps) {
  const { toggle, setFormData } = props;
  const { mutate } = UseModuleStatus()
  const { data, isFetching } = useModuleData()
  const [toggleData, setToggleData] = useState<boolean>(false);
  const [idToToggle, setIdToToggle] = useState<string>("")
  const { t } = useTranslation()
  const handleToggleData = (id: string) => {
    mutate(Number(id), {
      onSuccess: (res: any) => {
        if (res.data.status) {
          toastNotify.success(res.data.message)
        }
      }
    })
  }
  const columns = useMemo(
    () => [
      { Header: t('code'), accessor: 'code' },
      { Header: `${t('moduleName')}`, accessor: i18next.language === 'en' ? 'moduleNameEnglish' : 'moduleNameNepali' },
      { Header: `${t('parentModule')}`, accessor: i18next.language === 'en' ? 'parentModuleNameEnglish' : 'parentModuleNameNepali' },
      {
        Header: t('active'),
        Cell: ({ row }: Cell<ModuleSchemaResponse>) => {
          const { id, isActive } = row.original
          return (<Switch checked={isActive} onChange={() => {
            setIdToToggle(String(id))
            setToggleData(true)
          }
          } />)
        }
      },
      {
        Header: t('action'),
        Cell: ({ row }: Cell<ModuleSchemaResponse>) => {
          const { id, moduleNameEnglish, moduleNameNepali, code, description, parentModuleNameNepali, parentModuleId, parentModuleNameEnglish, resourceResponses, isConfigurable, url, iconClass, orderNumber } = row.original;

          return (
            <TableAction
              handleEditClick={
                () => {
                  toggle && toggle();
                  setFormData({
                    id, moduleNameEnglish, moduleNameNepali, code, description, isConfigurable, resourceIds: resourceResponses ? resourceResponses.map(el => ({ label: el.resourceName, value: el.id })) : [], url,
                    iconClass, parentModuleId: parentModuleId ? { label: i18next.language === 'en' ? parentModuleNameEnglish : parentModuleNameNepali, value: parentModuleId } : undefined,
                    orderNumber
                  });
                }
              }
            />
          );
        }
      }
    ],
    [setFormData, toggle, t]
  );
  return (
    <>
      <Table
        loading={isFetching}
        data={data?.data?.data || []}
        columns={columns}
        isSearch
      />
      <ConfirmModal toggleConfirmModal={() => setToggleData(!toggleData)}
        handleConfirmClick={() => handleToggleData(idToToggle)}
        confirmModal={toggleData}
        title="Are you sure to change status?"
      /></>
  )
}

export default ModuleTabel