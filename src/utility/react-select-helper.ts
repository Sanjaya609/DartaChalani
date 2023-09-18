interface IMapDataToStyledSelect<TData> {
  arrayData: TData[]
  name: keyof TData
  id: keyof TData
  nameNp?: keyof TData
}

// map back data to match OptionType for styled select component
export const mapDataToStyledSelect = <TData>(
  mapDataProps: IMapDataToStyledSelect<TData>
) => {
  const { arrayData, name, id, nameNp } = mapDataProps

  return (arrayData?.map((data) => ({
    value: data[id],
    label: data[name],
    labelNp: nameNp ? data[nameNp] : data[name],
    ...data
  })) || []) as OptionType[]
}
