import { Injectable, Logger } from '@nestjs/common'
import { InterfaceService } from './interface.service';
import { InterfaceInterface } from './interface.interface'

@Injectable()
export class InterfaceLogic {
  constructor(
    private readonly interfaceService: InterfaceService
  ) {}

  async getInterfaceForDiagramLogic(): Promise<any> {
    const sw9400 = await Promise.all([
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan43'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan44'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan45'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan46'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan47'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan88'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan99'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan304'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan305'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan600'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan606'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan611'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan612'),
        this.interfaceService.getInterfaceByName('sw9400', 'Vlan613')
    ])
    // const sw4503 = await Promise.all([
    //   this.interfaceService.getInterfaceByName('sw4503', 'Vlan43'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet3-41'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet3-43'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet3-45'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet3-47'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet2-1'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet2-2'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet2-3'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet2-4'),
    //   this.interfaceService.getInterfaceByName('sw4503', 'GigabitEthernet2-6')
    // ])
    const sw3850 = await Promise.all([
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan51'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan52'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan53'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan54'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan55'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan56'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan57'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan58'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan100'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan206'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan305'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan413'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan602'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan604'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan608'),
      this.interfaceService.getInterfaceByName('sw3850', 'Vlan666')
    ])
    const r101c = await Promise.all([
      this.interfaceService.getInterfaceByName('r101c', 'Vlan121'),
      this.interfaceService.getInterfaceByName('r101c', 'Vlan122'),
      this.interfaceService.getInterfaceByName('r101c', 'Vlan123'),
      this.interfaceService.getInterfaceByName('r101c', 'Vlan305'),
      this.interfaceService.getInterfaceByName('r101c', 'Vlan312'),
      this.interfaceService.getInterfaceByName('r101c', 'Vlan446'),
      this.interfaceService.getInterfaceByName('r101c', 'Vlan605')
    ])
    const r124 = await Promise.all([
      this.interfaceService.getInterfaceByName('r124', 'Vlan11'),
      this.interfaceService.getInterfaceByName('r124', 'Vlan12'),
      this.interfaceService.getInterfaceByName('r124', 'Vlan14'),
      this.interfaceService.getInterfaceByName('r124', 'Vlan15'),
      this.interfaceService.getInterfaceByName('r124', 'Vlan305'),
      this.interfaceService.getInterfaceByName('r124', 'Vlan607')
    ])
    // const r415 = await Promise.all([
    //   this.interfaceService.getInterfaceByName('r415', 'GigabitEthernet0-49'),
    //   this.interfaceService.getInterfaceByName('r415', 'GigabitEthernet0-50'),
    //   this.interfaceService.getInterfaceByName('r415', 'GigabitEthernet0-51'),
    //   this.interfaceService.getInterfaceByName('r415', 'GigabitEthernet0-52')

    // ])
    const r330a = await Promise.all([
      this.interfaceService.getInterfaceByName('r330a', 'Vlan31'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan32'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan33'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan34'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan35'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan36'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan37'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan38'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan305'),
      this.interfaceService.getInterfaceByName('r330a', 'Vlan603')
    ])
    const rshop = await Promise.all([
      this.interfaceService.getInterfaceByName('rshop', 'Vlan88')
    ])

    return {sw9400, sw3850, r101c, r124, r330a, rshop }
  }

//   async setInterface(deviceName: string, status: number): Promise<void> {
    
//   }
}
