type TypeCategoryDefaultData = Readonly<Record<string, string>>
export const CategoryDefaultData: TypeCategoryDefaultData = {
	1: 'Computadoras',
	2: 'Servidores',
	3: 'Laptops',
	4: 'All in One',
	5: 'Monitores',
	6: 'Impresoras Financieras',
	7: 'Impresoras Laser',
	8: 'Impresoras Tinta',
	9: 'Discos Duros',
	10: 'Teclados',
	11: 'Mouses',
	12: 'BAMs',
	13: 'Impresoras Multifuncionales',
	14: 'Celulares',
	15: 'Escaners',
	16: 'Antenas',
	17: 'Cable USB',
	18: 'Camaras',
	19: 'IPAD',
	20: 'WebCam',
	21: 'Cornetas',
	22: 'Docking',
	23: 'Lapiz Optico',
	24: 'Convertidor de VGA - HDMI',
	25: 'Micrófono'
} as const

export type CategoryKeys = keyof typeof CategoryDefaultData
export type CategoryValues =
	(typeof CategoryDefaultData)[keyof typeof CategoryDefaultData]

export const CategoryNames = {
	COMPUTER: 'Computadoras',
	SERVER: 'Servidores',
	LAPTOP: 'Laptops',
	ALLINONE: 'All in One',
	MONITOR: 'Monitores',
	FINANTIALPRINTER: 'Impresoras Financieras',
	LASERPRINTER: 'Impresoras Laser',
	INKPRINTER: 'Impresoras Tinta',
	HARDDRIVE: 'Discos Duros',
	KEYBOARD: 'Teclados',
	MOUSE: 'Mouses',
	BAM: 'BAMs',
	MFP: 'Impresoras Multifuncionales',
	PHONE: 'Celulares',
	SCANNER: 'Escaners',
	ANTENAS: 'Antenas',
	CABLEUSB: 'Cable USB',
	CAMARAS: 'Camaras',
	IPAD: 'IPAD',
	CORNETAS: 'Cornetas',
	DOCKING: 'Docking',
	LAPIZOPTICO: 'Lapiz Optico',
	CONVERTIDORVGAHDMI: 'Convertidor de VGA - HDMI',
	MIC: 'Micrófono',
	WEBCAM: 'WebCam'
}
