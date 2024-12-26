import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { SiteId } from '../../site/domain/SiteId'
import { TypeOfSiteId } from '../../typeofsites/domain/typeOfSiteId'
import { type LocationId } from './locationId'
import { LocationName } from './LocationName'
import { Subnet } from './Subnet'

export interface LocationPrimitives {
  id?: Primitives<LocationId>
  name: Primitives<LocationName>
  typeOfSiteId: Primitives<TypeOfSiteId>
  siteId: Primitives<SiteId>
  subnet: Primitives<Subnet>
}

export class Location {
  constructor (    
    private readonly name: LocationName,
    private readonly typeOfSiteId: TypeOfSiteId,
    private readonly siteId: SiteId,
    private readonly subnet: Subnet
  ) {}

  public static create (params: Omit<LocationPrimitives, 'id'>): Location {
    return new Location(
      new LocationName(params.name),
      new TypeOfSiteId(params.typeOfSiteId),
      new SiteId(params.siteId),
      new Subnet(params.subnet)
    )
  }

  nameValue (): Primitives<LocationName> {
    return this.name.value
  }

  typeOfSiteValue (): Primitives<TypeOfSiteId> {
    return this.typeOfSiteId.value
  }

  siteValue (): Primitives<SiteId> {
    return this.siteId.value
  }

  subnetValue (): Primitives<Subnet> {
    return this.subnet.value
  }

  toPrimitives (): LocationPrimitives {
    return {      
      name: this.nameValue(),
      typeOfSiteId: this.typeOfSiteValue(),
      siteId: this.siteValue(),
      subnet: this.subnetValue()
    }
  }
}
