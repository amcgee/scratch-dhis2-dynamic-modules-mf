import React, { useEffect, useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import AppAdapter from '@dhis2/app-adapter'
import { CssReset } from '@dhis2/ui'

// import Parcel from 'single-spa-react/parcel'
import 'typeface-roboto'

const baseConfig = {
    url: process.env.REACT_APP_DHIS2_BASE_URL,
    apiVersion: 34
}
const AppWrapper = ({ appModule }) => {
    const runtimeConfig = useConfig()
    return <appModule.App runtimeConfig={runtimeConfig} />
}
export const Shell = () => {
    const [appModule, setAppModule] = useState('')
    useEffect(() => {
        import('app1')
            .then(app => {
                setAppModule(app)
            })
    }, [])
    return <>
        <CssReset />
        <AppAdapter {...baseConfig} appName={appModule?.name || ''} >
            <AppWrapper appModule={appModule}/>
        </AppAdapter>
    </>
}