// eslint-disable-next-line import/no-cycle
import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import { calendarData } from '@/components/functional/Datepicker/datePicker'
import {
  DayInfo,
  DayPickerProps,
} from '@/components/functional/Datepicker/datePickerProps'
import {
  convertEngToNepNumber,
  getNumberOfDaysInBSMonth,
  range,
  splitDate,
} from '@/components/functional/Datepicker/datePickerUtils'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { useCallback, useMemo } from 'react'

function DayPickerBody(props: DayPickerProps) {
  const {
    calenderDate: date,
    selectedDate,
    onDaySelect,
    minDate,
    maxDate,
  } = props

  const previousMonth = useMemo(
    () => (date.bsMonth - 1 !== 0 ? date.bsMonth - 1 : 12),
    [date]
  )
  const previousYear = useMemo(
    () => (previousMonth === 12 ? date.bsYear - 1 : date.bsYear),
    [previousMonth, date]
  )
  const previousMonthDays = useMemo(
    () =>
      previousYear >= calendarData.minBsYear
        ? getNumberOfDaysInBSMonth({
            month: previousMonth,
            year: previousYear,
          })
        : 30,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previousYear]
  )

  const weeksInMonth = useMemo(() => {
    return (
      Math.ceil(
        (new Date(date.firstAdDayInBSMonth).getDay() +
          date.numberOfDaysInBSMonth) /
          7
      ) - 1
    )
  }, [date])

  const handleDateSelect = (dayInfo: DayInfo) => {
    if (dayInfo.isCurrentMonth) {
      onDaySelect({
        year: dayInfo.year,
        month: dayInfo.month,
        day: dayInfo.day,
      })
    }
  }

  const getDayInfo = useCallback(
    (weekNum: number, weekDayNum: number) => {
      let day = weekNum * 7 + weekDayNum - date.firstAdDayInBSMonth.getDay()
      const month = date.bsMonth
      const year = date.bsYear

      let isCurrentMonth = true

      if (day <= 0) {
        day = previousMonthDays + day
        isCurrentMonth = false
      } else if (day > date.numberOfDaysInBSMonth) {
        day -= date.numberOfDaysInBSMonth
        isCurrentMonth = false
      }

      const today = splitDate(ADToBS(new Date()))

      const isToday = isCurrentMonth
        ? today.day === day &&
          today.month === date.bsMonth &&
          today.year === date.bsYear
        : false
      const isSelected = isCurrentMonth
        ? selectedDate.bsDay === day &&
          selectedDate.bsMonth === date.bsMonth &&
          selectedDate.bsYear === date.bsYear
        : false

      return { day, month, year, isCurrentMonth, isToday, isSelected }
    },
    [date, selectedDate, previousMonthDays]
  )

  return (
    <tbody>
      {range(0, weeksInMonth).map((week: number) => (
        <tr key={week}>
          {range(1, 7).map((days: number) => {
            const dayInfo = getDayInfo(week, days)
            let dayDisabled = false
            if (minDate?.year && minDate.month && minDate.day) {
              dayDisabled =
                date.bsYear <= minDate.year &&
                date.bsMonth <= minDate.month &&
                dayInfo.day < minDate.day
            }
            if (maxDate?.year && maxDate.month && maxDate.day) {
              dayDisabled =
                date.bsYear >= maxDate.year &&
                date.bsMonth >= maxDate.month &&
                dayInfo.day > maxDate.day
            }
            if (minDate?.day && maxDate?.day) {
              dayDisabled =
                (date.bsYear <= minDate.year &&
                  date.bsMonth <= minDate.month &&
                  dayInfo.day < minDate.day) ||
                (date.bsYear >= maxDate.year &&
                  date.bsMonth >= maxDate.month &&
                  dayInfo.day > maxDate.day)
            }

            const dayClassName = getComputedClassNames(
              'block text-center rounded text-cool-gray-800 p-2 font-normal ',
              { 'bg-blue-24  text-white ': dayInfo.isSelected },
              { 'text-gray-300 ': !dayInfo.isCurrentMonth || dayDisabled },
              {
                'hover:bg-gray-200 ': !(
                  !dayInfo.isCurrentMonth ||
                  dayDisabled ||
                  dayInfo.isSelected
                ),
              }
            )
            return (
              <td key={days}>
                <span
                  aria-hidden
                  tabIndex={0}
                  className={dayClassName}
                  role="button"
                  onClick={() => !dayDisabled && handleDateSelect(dayInfo)}
                >
                  {convertEngToNepNumber(dayInfo.day)}
                </span>
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export default DayPickerBody
