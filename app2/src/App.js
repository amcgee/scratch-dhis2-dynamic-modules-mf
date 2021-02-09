import React, { useState } from 'react'
import { Provider, useDataQuery } from '@dhis2/app-runtime'
import { SingleSelect, SingleSelectOption } from '@dhis2/ui'
// import { Plugin } from './Plugin'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: ['displayName']
        }
    }
}

export const AppWrapper = ({ runtimeConfig }) => (
    <Provider config={runtimeConfig}>
        <App />
    </Provider>
)
export const App = () => {
    const { error, data } = useDataQuery(query)
    const [plugin, setPlugin] = useState()

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
            {/* { plugin && <Plugin appName={plugin} />} */}
        </div>
    }
    if (error) {
        console.error(error)
        return 'Error!'
    }
    return 'Loading...'
}

export const name = "My App"