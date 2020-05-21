import { Injectable } from '@nestjs/common'
import { CollectionReference } from '@google-cloud/firestore'
import { db } from 'src/database/firebase.config'
import * as moment from 'moment'
import { TrafficInterface } from './traffic.interface'

@Injectable()
export class TrafficService {
    private readonly networkRef: CollectionReference

    constructor() {
        this.networkRef = db.collection('network')
    }

    async getTrafficData(deviceName: string, startAt: number, endAt: number): Promise<TrafficInterface[]> {
        const data = []
        const start = new Date(
            moment
                .unix(startAt)
                .subtract(7, 'hour')
                .toString()
        )
        const end = new Date(
            moment
                .unix(endAt)
                .subtract(7, 'hour')
                .toString()
        )
        const results = await this.networkRef
            .doc(deviceName)
            .collection('traffic')
            .where('timestamp', '>=', start)
            .where('timestamp', '<=', end)
            .orderBy('timestamp', 'desc')
            .get()
        if (results.empty) {
            return
        }
        results.forEach(result => {
            const { timestamp, ...other } = result.data()
            const time = moment
                .unix(timestamp._seconds)
                .add(7, 'hour')
                .format('YYYY-MM-DD HH:mm:ss')
            data.push({ id: result.id, timestamp: time, ...other })
        })

        return data
    }

    async getTrafficTypeData(deviceName: string, type: string): Promise<TrafficInterface[]> {
        // tslint:disable-next-line:radix
        const unixTimeNow = moment()
            .subtract(22, 'days')
            .unix()
        const startAt = moment
            .unix(unixTimeNow)
            .subtract(7, 'hours')
            .toString()
        let endAt = moment
            .unix(unixTimeNow)
            .subtract(7, 'hours')
            .toString()

        if (type === 'month') {
            endAt = moment
                .unix(unixTimeNow)
                .add(30, 'days')
                .toString()
        } else if (type === 'days') {
            endAt = moment
                .unix(unixTimeNow)
                .add(24, 'hours')
                .toString()
        } else if (type === 'hours') {
            endAt = moment
                .unix(unixTimeNow)
                .add(1, 'hours')
                .toString()
        }
        const data = []
        const start = new Date(startAt)
        const end = new Date(endAt)
        const results = await this.networkRef
            .doc(deviceName)
            .collection('traffic')
            .where('timestamp', '>=', start)
            .where('timestamp', '<=', end)
            .orderBy('timestamp', 'asc')
            .get()
        if (results.empty) {
            return
        }

        let sumInbound = 0
        let sumOutbound = 0
        let timeBackup = ''
        let count = 0
        let hoursBackup = ''
        let minusBackup = ''
        results.forEach(result => {
            const { timestamp, inbound, outbound } = result.data()
            if (type === 'month') {
                const time = moment
                    .unix(timestamp._seconds)
                    .add(7, 'hours')
                    .format('YYYY-MM-DD')
                if (count === 0) {
                    timeBackup = time
                }
                if (timeBackup === time) {
                    sumInbound += inbound
                    sumOutbound += outbound
                } else {
                    data.push({ id: result.id, timestamp: timeBackup, inbound: sumInbound, outbound: sumOutbound })
                    timeBackup = time
                    sumInbound = inbound
                    sumOutbound = outbound
                }
                count++
                if (count === results.size) {
                    data.push({ id: result.id, timestamp: timeBackup, inbound: sumInbound, outbound: sumOutbound })
                }
            } else if (type === 'days') {
                const time = moment
                    .unix(timestamp._seconds)
                    .add(7, 'hours')
                    .format('YYYY-MM-DD HH:00:00')
                const timeHours = moment
                    .unix(timestamp._seconds)
                    .add(7, 'hours')
                    .format('HH')
                if (count === 0) {
                    timeBackup = time
                    hoursBackup = timeHours
                }
                if (hoursBackup === timeHours) {
                    sumInbound += inbound
                    sumOutbound += outbound
                } else {
                    data.push({ id: result.id, timestamp: timeBackup, inbound: sumInbound, outbound: sumOutbound })
                    hoursBackup = timeHours
                    timeBackup = time
                    sumInbound = inbound
                    sumOutbound = outbound
                }
                count++
                if (count === results.size) {
                    data.push({ id: result.id, timestamp: timeBackup, inbound: sumInbound, outbound: sumOutbound })
                }
            } else if (type === 'hours') {
                const time = moment
                    .unix(timestamp._seconds)
                    .add(7, 'hours')
                    .format('YYYY-MM-DD HH:mm:00')
                const timeMinus = moment
                    .unix(timestamp._seconds)
                    .add(7, 'hours')
                    .format('mm')
                if (count === 0) {
                    timeBackup = time
                    minusBackup = timeMinus
                }
                if (minusBackup === timeMinus) {
                    sumInbound += inbound
                    sumOutbound += outbound
                } else {
                    data.push({ id: result.id, timestamp: timeBackup, inbound: sumInbound, outbound: sumOutbound })
                    minusBackup = timeMinus
                    timeBackup = time
                    sumInbound = inbound
                    sumOutbound = outbound
                }
                count++
                if (count === results.size) {
                    data.push({ id: result.id, timestamp: timeBackup, inbound: sumInbound, outbound: sumOutbound })
                }
            }
        })

        return data
    }
}
