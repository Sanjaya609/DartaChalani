/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-cycle
import { calendarData } from '@/components/functional/Datepicker/datePicker'
import DatepickerDropdown from '@/components/functional/Datepicker/DatepickerDropdown'
import { YearMonthPickerProps } from '@/components/functional/Datepicker/datePickerProps'
import {
  convertEngToNepNumber,
  range,
} from '@/components/functional/Datepicker/datePickerUtils'
import { useMemo } from 'react'

function YearPicker(props: YearMonthPickerProps) {
  const { date, onSelect, minYear, maxYear } = props

  const years: OptionType[] = useMemo(
    (): OptionType[] =>
      range(
        minYear || calendarData.minBsYear,
        maxYear || calendarData.maxBsYear
      )
        // .reverse()
        .map(
          (year: number): OptionType => ({
            label: convertEngToNepNumber(Number(year)).toString(),
            value: year,
          })
        ),
    [minYear, maxYear]
  )

  const currentYear: OptionType = useMemo((): OptionType => {
    const year = date.bsYear

    return {
      label: convertEngToNepNumber(Number(year)).toString(),
      value: year,
    }
  }, [date])

  const handleDropdownView = (selected: OptionType) => {
    onSelect(selected.value)
  }
  return (
    <DatepickerDropdown
      options={years}
      label={currentYear.label}
      onSelect={handleDropdownView}
    />
  )
}

export default YearPicker
