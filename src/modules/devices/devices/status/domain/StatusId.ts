import { StringValueObject } from "@/modules/shared/domain/value-object/StringValueObject";

export class StatusId extends StringValueObject {
  static readonly StatusOptions: Record<string, string> = {
    INUSE: '1',
    INALMACEN: '2',
    PORDESINCORPORAR: '3',
    DESINCORPORADO: '4',
    PRESTAMO: '5',
    CONTINGENCIA: '6',
    GUARDIA: '7',
    DISPONIBLE: '8'
  } as const
}
