export interface IProvinceList {
  id: number
  provinceNameEn: string
  provinceNameNp: string
}

export interface IDistrictList {
  id: number
  provinceId: number
  provinceNameEn: string
  provinceNameNp: string
  districtNameEn: string
  districtNameNp: string
}

export interface ILocalBodyList {
  id: number
  districtId: number
  districtNameEn: string
  districtNameNp: string
  localBodyNameEn: string
  localBodyNameNp: string
  totalWards: number
}
