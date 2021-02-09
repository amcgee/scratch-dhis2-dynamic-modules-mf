import React, { useState, useEffect } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import classes from './plugin.module.css'
console.log(classes)

export const PluginContainer = () => {
    const [appModule, setAppModule] = useState()
    const runtimeConfig = useConfig()
    useEffect(() => {
        import(`app2/Plugin`)
            .then(app => {
                console.log(app)
                setAppModule(app)
            })
    }, [])
    return <div className={classes.pluginContainer}>
        <div className={classes.pluginHeader}>
            {appModule ? appModule.name : 'Loading...'}
        </div>
        {appModule && (<appModule.default 
            runtimeConfig={runtimeConfig}
        />)}
    </div>
}