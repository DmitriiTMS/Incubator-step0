import {app} from './app'
import { SETTINGS } from './settings/settings'

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`...server started in port ${port}`)
})