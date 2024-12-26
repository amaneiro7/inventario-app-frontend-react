import { LocationId } from "../../../../location/locations/domain/locationId";
import { TypeOfSiteId } from "../../../../location/typeofsites/domain/typeOfSiteId";
import { Primitives } from "../../../../shared/domain/value-object/Primitives";
import { StatusId } from "../../status/domain/StatusId";

export class DeviceLocation extends LocationId {
    private static errors: string = ''
    constructor(
        readonly value: Primitives<LocationId>,
        private readonly status: Primitives<StatusId>,
        private readonly typeOfSite?: Primitives<TypeOfSiteId>,
    ) {
        super(value)
        if (value === null || value === '') {
            this.value = null
        } else {
            this.value = value
        }
        if (!DeviceLocation.isValid({ status: this.status, typeOfSite: this.typeOfSite })) {
            throw new Error(DeviceLocation.invalidMessage())
        }
    }


    private static updateError(error: string): void {
        DeviceLocation.errors = error
    }

    private static get errorsValue(): string {
        return DeviceLocation.errors
    }

    public static isValid({ status, typeOfSite }: { typeOfSite?: Primitives<TypeOfSiteId>, status: Primitives<StatusId> }): boolean {
        if (!status) return true
        if ([
            StatusId.StatusOptions.INUSE,
            StatusId.StatusOptions.PRESTAMO,
            StatusId.StatusOptions.CONTINGENCIA,
            StatusId.StatusOptions.GUARDIA,
            StatusId.StatusOptions.DISPONIBLE,
        ].includes(status) && typeOfSite === TypeOfSiteId.SitesOptions.ALMACEN) {
            this.updateError('Si esta en uso, la ubicación no puede estar en almacen')
            return false
        }
        if ([
            StatusId.StatusOptions.INALMACEN,
            StatusId.StatusOptions.PORDESINCORPORAR,
        ].includes(status) && typeOfSite !== TypeOfSiteId.SitesOptions.ALMACEN) {

            this.updateError('Si no esta en uso, solo puede estar ubicado en el almacen')
            return false
        }
        if (status !== StatusId.StatusOptions.DESINCORPORADO && !typeOfSite) {
            this.updateError('La ubicación es requerida')
            return false
        }
        return true
    }

    public static invalidMessage(): string {
        return this.errorsValue
    }
}