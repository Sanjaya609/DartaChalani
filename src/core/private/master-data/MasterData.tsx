import React from 'react'
import Layout from '../../../components/layout'
import { Outlet } from 'react-router-dom'

function MasterData() {
    return (
        <Layout.Main>
            <Outlet />
        </Layout.Main>
    )
}

export default MasterData