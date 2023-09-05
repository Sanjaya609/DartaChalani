/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-cycle
import { calendarData } from '@/components/functional/Datepicker/datePicker'
import DatepickerDropdown from '@/components/functional/Datepicker/DatepickerDropdown'
import { YearMonthPickerProps } from '@/components/functional/Datepicker/datePickerProps'
import { useMemo } from 'react'

function MonthPicker(props: YearMonthPickerProps) {
  const { date, onSelect, minMonth, maxMonth, maxYear, minYear } = props

  const monthList: OptionType[] = useMemo(() => {
    return calendarData.bsMonths
      .map((month, index) => ({
        label: month,
        value: index + 1,
      }))
      .filter((month) => {
        if (minMonth && maxMonth) {
          return (
            (date.bsYear > minYear ? true : +month.value >= minMonth) &&
            (date.bsYear < maxYear ? true : +month.value <= maxMonth)
          )
        }
        if (minMonth) {
          return date.bsYear > minYear ? true : +month.value >= minMonth
        }
        if (maxMonth) {
          return date.bsYear < maxYear ? true : +month.value <= maxMonth
        }
        return true
      })
  }, [date, minMonth, maxMonth, minYear, maxYear])

  const currentMonth: OptionType = useMemo((): OptionType => {
    const month = date.bsMonth
    return {
      label: calendarData.bsMonths[month - 1],
      value: month,
    }
  }, [date])

  const handleDropdownView = (selected: OptionType) => {
    onSelect(selected.value)
  }

  return (
    <DatepickerDropdown
      options={monthList}
      label={currentMonth.label}
      onSelect={handleDropdownView}
    />
  )
}

export default MonthPicker
