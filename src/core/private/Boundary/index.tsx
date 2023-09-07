import MainHeader from '@/components/functional/MainHeader'
import BaseLayout from '@/components/ui/core/Layout/BaseLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import WrapperLayout from '@/components/ui/core/Layout/WrapperLayout'

import { Outlet } from 'react-router-dom'
import { useState, useMemo } from 'react'
import Modal from '@/components/ui/Modal/Modal'
import { Button } from '@/components/ui'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/functional/Table'

function Boundary() {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'process',
        header: 'Test',
      },
      {
        accessorKey: 'count',
        header: 'test',
      },
    ],
    []
  )

  return (
    <>
      <WrapperLayout>
        <BaseLayout>
          <MainHeader />
          <FlexLayout direction="row">
            <div className="container h-full w-full py-7">
              <DataTable columns={columns} data={[]} />
            </div>
            <Outlet />
          </FlexLayout>
        </BaseLayout>
      </WrapperLayout>
    </>
  )
}

export default Boundary
