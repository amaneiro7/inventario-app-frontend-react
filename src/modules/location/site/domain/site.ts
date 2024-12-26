import { type Primitives } from "../../../shared/domain/value-object/Primitives"
import { CityId } from "../../city/domain/CityId"
import { SiteAddress } from "./SiteAddress"
import { type SiteId } from "./SiteId"
import { SiteName } from "./SiteName"

export interface SitePrimitives {
  id?: Primitives<SiteId>
  name: Primitives<SiteName>
  cityId: Primitives<CityId>
  address: Primitives<SiteAddress>
}

export class Site {
  constructor(
    private readonly name: SiteName,
    private readonly ciityId: CityId,
    private readonly address: SiteAddress
  ) { }

  public static create(params: Omit<SitePrimitives, 'id'>): Site {
    return new Site(
      new SiteName(params.name),
      new CityId(params.cityId),
      new SiteAddress(params.address)
    )
  }

  nameValue(): Primitives<SiteName> {
    return this.name.value
  }

  cityValue(): Primitives<CityId> {
    return this.ciityId.value
  }

  addressValue(): Primitives<SiteAddress> {
    return this.address.value
  }

  toPrimitives(): SitePrimitives {
    return {
      name: this.nameValue(),
      cityId: this.cityValue(),
      address: this.addressValue()
    }
  }
}
