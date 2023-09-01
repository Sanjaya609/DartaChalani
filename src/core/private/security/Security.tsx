import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../../components/layout'

function Security() {
    return (
        <Layout.Main>
            <Outlet />
        </Layout.Main>
    )
}

export default Security