/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flexbox } from '@/components/ui/core/Flexbox'
import { Icon } from '@/components/ui/core/Icon'
// eslint-disable-next-line import/no-cycle
import { CalenderControllerProps } from '@/components/functional/Datepicker/datePickerProps'
import MonthPicker from '@/components/functional/Datepicker/MonthPicker'
import YearPicker from '@/components/functional/Datepicker/YearPicker'
import { CaretLeft, CaretRight } from 'phosphor-react'
import React, { useEffect, useState } from 'react'

function CalendarController(props: CalenderControllerProps) {
  const {
    onNextMonth,
    onPreviousMonth,
    calenderDate,
    onYearSelect,
    onMonthSelect,
    minDate,
    maxDate,
  } = props

  const [disableNext, setdisableNext] = useState(false)
  const [disablePrevious, setdisablePrevious] = useState(false)
  const [disableToday, setdisableToday] = useState(false)

  useEffect(() => {
    if (maxDate.year && maxDate.month) {
      setdisableNext(
        () =>
          maxDate.year <= calenderDate.bsYear &&
          maxDate.month <= calenderDate.bsMonth
      )
      setdisableToday(
        () =>
          maxDate.year <= calenderDate.bsYear &&
          maxDate.month <= calenderDate.bsMonth &&
          maxDate.day < calenderDate.bsDay
      )
    }
    if (minDate.year && minDate.month) {
      setdisablePrevious(
        () =>
          minDate.year >= calenderDate.bsYear &&
          minDate.month >= calenderDate.bsMonth
      )
      setdisableToday(
        () =>
          minDate.year >= calenderDate.bsYear &&
          minDate.month >= calenderDate.bsMonth &&
          maxDate.day > calenderDate.bsDay
      )
    }
  }, [minDate, maxDate, calenderDate])

  return (
    <Flexbox
      justify="space-between"
      align="center"
      className="mb-4 border-b-2 p-4"
    >
      <Icon
        className={`${disablePrevious ? 'disabled' : ''}`}
        alt="Small icon"
        color="text-black-500"
        icon={CaretLeft}
        size={18}
        role="button"
        onClick={() => !disablePrevious && onPreviousMonth()}
      />
      <Flexbox>
        <MonthPicker
          date={calenderDate}
          onSelect={onMonthSelect}
          maxYear={maxDate?.year}
          minYear={minDate?.year}
          maxMonth={maxDate.month}
          minMonth={minDate.month}
        />
        <YearPicker
          date={calenderDate}
          onSelect={onYearSelect}
          maxYear={maxDate.year}
          minYear={minDate.year}
        />
      </Flexbox>
      <Icon
        className={`${disableNext ? 'disabled' : ''}`}
        alt="Small icon"
        color="text-black-500"
        icon={CaretRight}
        size={18}
        role="button"
        onClick={() => !disableNext && onNextMonth()}
      />
    </Flexbox>
  )
}

export default CalendarController
