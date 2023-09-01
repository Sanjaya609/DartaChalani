import { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import Table from '../../../../components/Table/DataTable';
import { TableAction } from '../../../../components/Table/TableComponent';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import { Switch } from '../../../../components/core/FormElement';
import { UseResourceStatus, useResourceData } from './query';
import { ResourseData, ResourseSchema } from './schema';
interface ResourceTableProps {
  toggle?: () => void;
  setFormData: Dispatch<SetStateAction<ResourseData>>;
}
function ResourceTable(props: ResourceTableProps) {
  const { toggle, setFormData } = props;
  const { data, isFetching } = useResourceData()
  const { t } = useTranslation()
  const columns = useMemo(
    () => [
      { Header: t('httpMethod'), accessor: 'httpMethod' },
      { Header: `${t('privilege')}`, accessor: 'privilege' },
      { Header: `${t('resourceName')}`, accessor: 'resourceName' },
      { Header: `${t('url')}`, accessor: 'url' },
      {
        Header: t('active'),
        Cell: ({ row }: Cell<ResourseSchema>) => {
          const { mutate } = UseResourceStatus()
          const { id, isActive } = row.original
          return (<Switch checked={isActive} onChange={() => mutate(Number(id), {
            onSuccess: (res: any) => {
              if (res.data.status) {
                toastNotify.success(res.data.message)
              }
            }
          })} />)
        }
      },
      {
        Header: t('action'),
        Cell: ({ row }: Cell<ResourseSchema>) => {
          const { id, httpMethod, privilege, url, resourceName, isActive } = row.original;

          return (
            <TableAction
              handleEditClick={
                () => {
                  toggle && toggle();
                  setFormData({ id, url, resourceName, privilege: { label: privilege, value: privilege }, httpMethod: { label: httpMethod, value: httpMethod }, isActive });
                }
              }
            />
          );
        }
      }
    ],
    [setFormData, t, toggle]
  );
  return (
    <Table
      loading={isFetching}
      data={data?.data?.data || []}
      columns={columns}
    />
  )
}

export default ResourceTable