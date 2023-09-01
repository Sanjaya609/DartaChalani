import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { UseSwitchCurrentFiscalYearStatus, UseUpdateFiscalYearStatus, useFiscalYearData } from './query';
import { FiscalYearData, FiscalYearResponse } from './schema';
import { Cell } from 'react-table';
import { TableAction } from '../../../../components/Table/TableComponent';
import Table from '../../../../components/Table/DataTable';
import { CheckBox, Switch } from '../../../../components/core/FormElement';
import { useTranslation } from 'react-i18next';
import toast from '../../../../components/ToastNotifier/ToastNotifier';
interface FiscalyearTableProps {
    toggle?: () => void;
    setFormData: Dispatch<SetStateAction<FiscalYearData>>;
}
function FiscalyearTable(props: FiscalyearTableProps) {
    const { toggle, setFormData } = props;
    const { t } = useTranslation()
    const { data, isFetching } = useFiscalYearData()
    const columns = useMemo(
        () => [
            { Header: `${t('fiscalYearName')} (${t('inEnglish')})`, accessor: 'fiscalYearNameEn' },
            { Header: `${t('fiscalYearName')} (${t('inNepali')})`, accessor: 'fiscalYearNameNp' },
            { Header: t('startDate'), accessor: 'startDateBs' },
            { Header: t('endDate'), accessor: 'endDateBs' },
            {
                Header: t('isCurrentFiscalyear'),
                Cell: ({ row }: Cell<FiscalYearResponse>) => {
                    const { mutate } = UseSwitchCurrentFiscalYearStatus()
                    const { isCurrentFiscalYear, id } = row.original
                    return (<CheckBox checked={isCurrentFiscalYear} onChange={() => mutate(Number(id), {
                        onSuccess: (res: any) => {
                            if (res.data?.status) {
                                toast.success(res.data.message)
                            }
                        }
                    })} />)
                }
            },
            {
                Header: t('active'),
                Cell: ({ row }: Cell<FiscalYearResponse>) => {
                    const { mutate } = UseUpdateFiscalYearStatus()
                    const { isActive, id } = row.original
                    return (<Switch checked={isActive} onChange={() => mutate(Number(id), {
                        onSuccess: (res: any) => {
                            if (res.data?.status) {
                                toast.success(res.data.message)
                            }
                        }
                    })} />)
                }
            },
            {
                Header: t('action'),
                Cell: ({ row }: Cell<FiscalYearResponse>) => {
                    const { id, fiscalYearNameEn, fiscalYearNameNp, startDateBs, endDateBs } = row.original;

                    return (
                        <TableAction
                            handleEditClick={
                                () => {
                                    toggle && toggle();
                                    setFormData({ id, fiscalYearNameEn, fiscalYearNameNp, startDateBs, endDateBs });
                                }
                            }
                        />
                    );
                }
            }
        ],
        [setFormData, toggle,t]
    );
    return (
        <Table
            loading={isFetching}
            data={data?.data?.data || []}
            columns={columns}
        />
    )
}

export default FiscalyearTable