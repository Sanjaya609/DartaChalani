/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@/components/ui/core/Box'
import React, { useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line import/no-cycle
import {
  CalendarProps,
  ParsedDate,
  parsedDateInitialValue,
  SplittedDate,
} from '@/components/functional/Datepicker/datePickerProps'
import {
  executionDelegation,
  stitchDate,
} from '@/components/functional/Datepicker/datePickerUtils'
import {
  ADToBS,
  parseBSDate,
} from '@/components/functional/Datepicker/dateConverter'
import DayPicker from './DayPicker'
import CalendarController from './CalendarController'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'

function NepaliCalendar(props: CalendarProps) {
  const {
    value,
    events,
    minDate,
    maxDate,
    disabled,
    right,
    setExactToday = false,
    className,
  } = props
  const [selectedDate, setSelectedDate] = useState<ParsedDate>(
    parsedDateInitialValue
  )
  const [calenderDate, setCalenderDate] = useState<ParsedDate>(
    parsedDateInitialValue
  )

  useEffect(() => {
    const parsedDateValue = parseBSDate(value || ADToBS(new Date()))
    setSelectedDate(parsedDateValue)
    setCalenderDate(parsedDateValue)
    // setIsInitialized(true)
  }, [value])

  const onPreviousMonthHandler = useCallback(() => {
    executionDelegation(
      () => {
        setCalenderDate((date) => {
          let year = date.bsYear
          let month = date.bsMonth - 1

          if (month < 1) {
            month = 12
            // eslint-disable-next-line no-plusplus
            year--
          }

          return parseBSDate(
            stitchDate(
              {
                day: date.bsDay,
                month,
                year,
              },
              '-'
            )
          )
        })
      },
      () => {
        if (events.previousMonthSelect) {
          events.previousMonthSelect({
            month: calenderDate.bsMonth,
            year: calenderDate.bsYear,
          })
        }
      }
    )
  }, [calenderDate.bsMonth, calenderDate.bsYear, events])

  const onNextMonthClickHandler = useCallback(() => {
    executionDelegation(
      () => {
        setCalenderDate((date) => {
          let year = date.bsYear
          let month = date.bsMonth + 1

          if (month > 12) {
            month = 1
            year += 1
          }

          return parseBSDate(
            stitchDate(
              {
                day: date.bsDay,
                month,
                year,
              },
              '-'
            )
          )
        })
      },
      () => {
        if (events.nextMonthSelect) {
          events.nextMonthSelect({
            year: calenderDate.bsYear,
            month: calenderDate.bsMonth,
          })
        }
      }
    )
  }, [calenderDate.bsMonth, calenderDate.bsYear, events])

  const onTodayClickHandler = useCallback(() => {
    const today = parseBSDate(ADToBS(new Date()))

    executionDelegation(
      () => {
        setCalenderDate(today)
        setSelectedDate(today)
      },
      () => {
        if (events.todaySelect) {
          events.todaySelect({
            year: today.bsYear,
            month: today.bsMonth,
            day: today.bsDay,
          })
        }

        // OnChange
        return events.change && events.change(ADToBS(new Date()))
      }
    )
  }, [events])

  const onYearSelectHandler = useCallback(
    (year: number) => {
      executionDelegation(
        () => {
          setCalenderDate(
            parseBSDate(
              stitchDate({
                year,
                month: calenderDate.bsMonth,
                day: calenderDate.bsDay,
              })
            )
          )
        },
        () => {
          if (events.yearSelect) {
            events.yearSelect(year)
          }
        }
      )
    },
    [calenderDate.bsDay, calenderDate.bsMonth, events]
  )

  const onMonthSelectHandler = useCallback(
    (month: any) => {
      executionDelegation(
        () => {
          setCalenderDate(
            parseBSDate(
              stitchDate({
                year: calenderDate.bsYear,
                month,
                day: calenderDate.bsDay,
              })
            )
          )
        },
        () => {
          if (events.monthSelect) {
            events.monthSelect(month)
          }
        }
      )
    },
    [calenderDate.bsDay, calenderDate.bsYear, events]
  )

  const onDaySelectHandler = useCallback(
    (date: SplittedDate) => {
      executionDelegation(
        () => {
          const newDate = parseBSDate(stitchDate(date))

          setCalenderDate(newDate)
          setSelectedDate(newDate)
        },
        () => {
          if (events.daySelect) {
            events.daySelect(date)
          }

          // OnChange
          return events.change && events.change(stitchDate(date))
        }
      )
    },
    [events]
  )

  const computedCalendarClassName = getComputedClassNames(
    'text-cool-gray-800 absolute left-0 top-full z-20 h-auto  w-full bg-white shadow-[0_8px_16px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.08)]',
    'w-[250px]',
    className
  )

  return (
    <Box
      className={computedCalendarClassName}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
      }}
    >
      <CalendarController
        onPreviousMonth={onPreviousMonthHandler}
        onNextMonth={onNextMonthClickHandler}
        calenderDate={calenderDate}
        onToday={onTodayClickHandler}
        onYearSelect={onYearSelectHandler}
        onMonthSelect={onMonthSelectHandler}
        minDate={minDate}
        maxDate={maxDate}
      />
      <DayPicker
        selectedDate={selectedDate}
        calenderDate={calenderDate}
        onDaySelect={onDaySelectHandler}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Box>
  )
}

export default NepaliCalendar
