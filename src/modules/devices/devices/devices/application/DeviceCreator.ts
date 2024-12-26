import { Computer, type ComputerPrimitives } from '../../../fetures/computer/domain/Computer'
import { HardDrive, type HardDrivePrimitives } from '../../../fetures/hardDrive/hardDrive/domain/HardDrive'
import { MFP, MFPPrimitives } from '../../../fetures/multiFunctionalPrinter/MFP'
import { Device, type DevicePrimitives } from '../domain/Device'
import { DeviceId } from '../domain/DeviceId'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceCreator {
  constructor(private readonly repository: DeviceRepository) { }

  async create(params: DevicePrimitives): Promise<void> {
    let device: Device | Computer | HardDrive
    // Logica cuando es computadora, laptop, servidor o all in one
    if (Computer.isComputerCategory({ categoryId: params.categoryId })) {
      device = Computer.create(params as ComputerPrimitives)
    }
    // logica cuando es disco duro
    else if (HardDrive.isHardDriveCategory({ categoryId: params.categoryId })) {
      device = HardDrive.create(params as HardDrivePrimitives)
    }
    // logica cuando esimMpresora multifuncional
    else if (MFP.isMFPCategory({ categoryId: params.categoryId })) {
      device = MFP.create(params as MFPPrimitives)
    }
    // logica para el rsto que no tiene algunca caracteristicas especial
    else {
      device = Device.create(params)
    }

    if (params.id === undefined) {
      return await this.repository.save({ device })
    } else {
      const deviceId = new DeviceId(params.id)
      return await this.repository.update({ id: deviceId, device })
    }
  }
}
