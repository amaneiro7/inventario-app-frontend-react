import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject'

export class CategoryId extends StringValueObject {
	static readonly categoryOptions = {
		COMPUTER: '1',
		SERVER: '2',
		LAPTOP: '3',
		ALLINONE: '4',
		MONITOR: '5',
		FINANTIALPRINTER: '6',
		LASERPRINTER: '7',
		INKPRINTER: '8',
		HARDDRIVE: '9',
		KEYBOARD: '10',
		MOUSE: '11',
		BAM: '12',
		MFP: '13',
		PHONE: '14',
		SCANNER: '15',
		ANTENAS: '16',
		CABLEUSB: '17',
		CAMARAS: '18',
		IPAD: '19',
		WEBCAM: '20',
		CORNETAS: '21',
		DOCKING: '22',
		LAPIZOPTICO: '23',
		CONVERTIDORVGAHDMI: '24',
		MIC: '25'
	} as const
}
