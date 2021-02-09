import React, { useEffect, useState } from 'react'
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import { SingleSelect, SingleSelectOption } from '@dhis2/ui'
import { componentAdapter } from './componentAdapter'
import { PluginContainer } from './PluginContainer'
// import { Plugin } from './Plugin'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: ['displayName']
        }
    }
}

export const App = componentAdapter(() => {
    const { error, data } = useDataQuery(query)
    const [plugin, setPlugin] = useState()
    const config = useConfig()

    if (data) {
        return <div style={{
            padding: 32,
            textAlign: 'center'

        }}>
            <h1>Hello {data.me.displayName}</h1>
            <h3>Welcome to DHIS2</h3>
            <SingleSelect selected={plugin} onChange={({ selected }) => setPlugin(selected)}>
                <SingleSelectOption
                    label="App #2"
                    value="app2"
                />
            </SingleSelect>
            { plugin && <PluginContainer runtimeConfig={config} appName={plugin} />}
        </div>
    }
    if (error) {
        console.error(error)
        return 'Error!'
    }
    return 'Loading...'
})

export const name = "My App"