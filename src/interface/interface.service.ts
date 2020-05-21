import { Injectable } from '@nestjs/common'
import { CollectionReference } from '@google-cloud/firestore'
import { db } from '../database/firebase.config'
import { InterfaceInterface } from './interface.interface'

@Injectable()
export class InterfaceService {
    private readonly networkRef: CollectionReference

    constructor() {
        this.networkRef = db.collection('network')
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    
    async getAllInterface(deviceName: string): Promise<InterfaceInterface[]> {
        const interfaceValue = []
        const allInterfaces = await this.networkRef
            .doc(deviceName)
            .collection('interface')
            .get()
        allInterfaces.forEach(eachInterface => {
            const name = eachInterface.id.replace(/-/g, '/')
            var numberPattern = /\d+/g;
            let numberName = name.match( numberPattern ).join('')
            // const numberName2 = numberName.split(',')
            if (numberName.length == 2 && name.indexOf('GigabitEthernet') != -1) {
                numberName = '0'+numberName
            } else {
                numberName = '9999'
            }
            interfaceValue.push({ numberName: numberName, interface: name, ...eachInterface.data() })
        })
        interfaceValue.sort(this.dynamicSort("numberName"));

        return interfaceValue
    }

    async getInterfaceByName(deviceName: string, interfaceName: string): Promise<any> {
        const result = await this.networkRef
            .doc(deviceName)
            .collection('interface')
            .doc(interfaceName)
            .get()
        const name = result.id.replace(/-/g, '/')

        return { interfaceName: name, ...result.data() }
    }

    async getInterfaceInboundTopRank(rank: number) {
        const data = []
        const results = await db
            .collectionGroup('interface')
            .orderBy('inbound', 'desc')
            // .limit(rank)
            .get()
        results.forEach(result => {
            const name = result.id.replace(/-/g, '/')
            if (name.indexOf('Vlan') !== -1) {
                if (data.length < rank) {
                    data.push({ interface: name, ...result.data() })
                }
            }
        })

        return data
    }

    async getInterfaceOutboundTopRank(rank: number) {
        const data = []
        const results = await db
            .collectionGroup('interface')
            .orderBy('outbound', 'desc')
            // .limit(rank)
            .get()
        results.forEach(result => {
            const name = result.id.replace(/-/g, '/')
            if (name.indexOf('Vlan') !== -1) {
                if (data.length < rank) {
                    data.push({ interface: name, ...result.data() })
                }
            }
            // data.push({ interface: name, ...result.data() })
        })

        return data
    }
}
