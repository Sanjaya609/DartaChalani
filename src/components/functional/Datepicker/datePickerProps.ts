import { HTMLAttributes } from 'react'
// eslint-disable-next-line import/no-cycle

export interface ParsedDate {
  bsYear: number
  bsMonth: number
  bsDay: number
  weekDay: number
  adDate: Date
  numberOfDaysInBSMonth: number
  firstAdDayInBSMonth: Date
}

export interface SplittedDate {
  year: number
  month: number
  day: number
}

export interface DayPickerProps {
  selectedDate: ParsedDate
  calenderDate: ParsedDate
  onDaySelect: (date: SplittedDate) => void
  minDate?: { year: number; month: number; day: number }
  maxDate?: { year: number; month: number; day: number }
}

export interface DayInfo {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

export const parsedDateInitialValue: ParsedDate = {
  adDate: new Date(),
  bsDay: 0,
  bsMonth: 0,
  bsYear: 0,
  firstAdDayInBSMonth: new Date(),
  numberOfDaysInBSMonth: 0,
  weekDay: 0,
}

export interface YearMonth {
  year: number
  month: number
}

export interface NepaliDatepickerEvents {
  change?: (value: string) => void
  yearSelect?: (year: number) => void
  monthSelect?: ({ year, month }: YearMonth) => void
  daySelect?: ({ year, month, day }: SplittedDate) => void
  previousMonthSelect?: ({ month, year }: YearMonth) => void
  nextMonthSelect?: ({ year, month }: YearMonth) => void
  todaySelect?: ({ year, month, day }: SplittedDate) => void
}

export interface NepaliDatePickerOptions {
  closeOnSelect?: boolean
}

export interface INepaliDatePicker extends NepaliDatePickerOptions {
  value?: string
  engDate?: string
  id?: string
  name?: string
  className?: HTMLAttributes<HTMLDivElement>['className']
  datePickerWrapperClassName?: HTMLAttributes<HTMLInputElement>['className']
  onChange?: (nepdate?: string, engdate?: Date | null) => void
  onBlur?: () => void
  onSelect?: (value: string) => void
  options?: NepaliDatepickerEvents
  maxDate?: string
  maxDateToday?: boolean
  minDate?: string
  minDateToday?: boolean
  disabled?: boolean
  disableColor?: boolean
  right?: boolean
  setExactToday?: boolean
  canClearDate?: boolean
  showError?: boolean
}

export interface CalendarProps {
  value: string
  events: NepaliDatepickerEvents
  minDate: { year: number; month: number; day: number }
  maxDate: { year: number; month: number; day: number }
  disabled?: boolean
  right?: boolean
  setExactToday?: boolean
}

export interface CalenderControllerProps {
  onNextMonth: () => void
  onToday: () => void
  onPreviousMonth: () => void
  onYearSelect: (year: number) => void
  onMonthSelect: (year: number) => void
  calenderDate: ParsedDate
  minDate: { year: number; month: number; day: number }
  maxDate: { year: number; month: number; day: number }
}

export interface YearMonthPickerProps {
  date: ParsedDate
  onSelect: (year: number) => void
  minMonth?: number
  maxMonth?: number
  minYear: number
  maxYear: number
}

export interface DatepickerDropdownProps {
  options: OptionType[]
  label: string
  onSelect: (selected: OptionType) => void
}
