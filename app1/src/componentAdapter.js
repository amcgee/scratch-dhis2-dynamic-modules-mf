import React from 'react'
import { Provider } from '@dhis2/app-runtime'

export const componentAdapter = Component => {
    const ComponentAdapter = ({ runtimeConfig }) => (
        <Provider config={runtimeConfig}>
            <Component />
        </Provider>
    )
    ComponentAdapter.displayName = `ComponentAdapter(${Component.displayName})`
    return ComponentAdapter
}