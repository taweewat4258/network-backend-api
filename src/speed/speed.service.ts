import { Injectable } from '@nestjs/common'
import { db } from 'src/database/firebase.config'
import * as moment from 'moment'
import { SpeedInterface } from './speed.interface'

@Injectable()
export class SpeedService {
    async getSpeedData(): Promise<SpeedInterface[]> {
        const data = []
        const results = await db
            .collectionGroup('speed')
            .orderBy('timestamp', 'desc')
            .limit(8)
            .get()
        results.forEach(result => {
            const { timestamp, ...other } = result.data()
            const time = moment
                .unix(timestamp._seconds)
                .add(7, 'hours')
                .format('HH:mm  DD-MM-YYYY')
            data.push({ deviceName: result.ref.parent.parent.id, timestamp: time, ...other })
        })

        return data
    }

    async getSpeedByNetworkData(network, date): Promise<SpeedInterface[]> {
        const data = []
        const start = new Date(
            moment
                .unix(date.startAt)
                .subtract(7, 'hour')
                .toString()
        )
        const end = new Date(
            moment
                .unix(date.endAt)
                .subtract(7, 'hour')
                .toString()
        )
        const results = await db
            .collection('network')
            .doc(network)
            .collection('speed')
            .where('timestamp', '>', start)
            .where('timestamp', '<', end)
            .orderBy('timestamp', 'desc')
            .get()

        // await this.networkRef.doc(deviceName).collection('traffic')
        // .where('timestamp', '>=', start)
        // .where('timestamp', '<=', end)
        // .orderBy('timestamp', 'desc')
        // .get()
        results.forEach(result => {
            const { timestamp, ...other } = result.data()
            const time = moment
                .unix(timestamp._seconds)
                .add(7, 'hours')
                .format('YYYY-MM-DD HH:mm:ss')
            data.push({ deviceName: result.ref.parent.parent.id, timestamp: time, ...other })
        })

        return data
    }
}
