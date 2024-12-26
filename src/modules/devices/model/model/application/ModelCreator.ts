import { ModelComputer, type ModelComputerPrimitives } from '../../ModelCharacteristics/modelComputer/ModelComputer'
import { ModelKeyboard, type ModelKeyboardPrimitives } from '../../ModelCharacteristics/modelKeyboard/ModelKeyboard'
import { ModelLaptop, type ModelLaptopPrimitives } from '../../ModelCharacteristics/modelLaptop/ModelLaptop'
import { ModelMonitor, type ModelMonitorPrimitives } from '../../ModelCharacteristics/modelMonitor/ModelMonitor'
import { ModelMouse, type ModelMousePrimitives } from '../../ModelCharacteristics/modelMouse/ModelMouse'
import { ModelPrinter, type ModelPrinterPrimitives } from '../../ModelCharacteristics/modelPrinter/ModelPrinter'
import { Model, type ModelPrimitives } from '../domain/Model'
import { ModelId } from '../domain/ModelId'
import { type ModelRepository } from '../domain/ModelRepository'

export class ModelCreator {
  constructor(readonly repository: ModelRepository) { }

  async create(params: ModelPrimitives): Promise<void> {
    let model: Model | ModelComputer | ModelLaptop | ModelMonitor | ModelPrinter | ModelKeyboard
    if (ModelComputer.isComputerCategory({ categoryId: params.categoryId })) {
      model = ModelComputer.create(params as ModelComputerPrimitives)
    } else if (ModelLaptop.isLaptopCategory({ categoryId: params.categoryId })) {
      model = ModelLaptop.create(params as ModelLaptopPrimitives)
    } else if (ModelMonitor.isMonitorCategory({ categoryId: params.categoryId })) {
      model = ModelMonitor.create(params as ModelMonitorPrimitives)
    } else if (ModelPrinter.isPrinterCategory({ categoryId: params.categoryId })) {
      model = ModelPrinter.create(params as ModelPrinterPrimitives)
    } else if (ModelKeyboard.isKeyboardCategory({ categoryId: params.categoryId })) {
      model = ModelKeyboard.create(params as ModelKeyboardPrimitives)
    } else if (ModelMouse.isMouseCategory({ categoryId: params.categoryId })) {
      model = ModelMouse.create(params as ModelMousePrimitives)
    } else {
      model = Model.create(params)
    }

    if (params.id === undefined) {
      return await this.repository.save({ model })
    } else {
      const modelId = new ModelId(params.id)
      return await this.repository.update({ id: modelId, model })
    }
  }
}
