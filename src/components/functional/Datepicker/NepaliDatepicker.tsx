/* eslint-disable no-console */

import { Box } from '@/components/ui/core/Box'
import { Flexbox } from '@/components/ui/core/Flexbox'
import { Icon } from '@/components/ui/core/Icon'
import {
  ADToBS,
  BSToAD,
} from '@/components/functional/Datepicker/dateConverter'
import {
  INepaliDatePicker,
  NepaliDatepickerEvents,
  SplittedDate,
} from '@/components/functional/Datepicker/datePickerProps'
import {
  convertEngToNepNumber,
  stitchDate,
  validateBsDay,
  validateBsMonth,
  validateBsYear,
} from '@/components/functional/Datepicker/datePickerUtils'
import NepaliCalendar from '@/components/functional/Datepicker/NepaliCalendar'
// import { TextInput } from '@/components/functional/FormFields/TextInput/TextInput'
import { Calendar, X } from 'phosphor-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ICalendarIconWithXProps {
  date: string
  handleOnChange: (changedDate: string) => void
  hideRemoveIcon?: boolean
}

const CalendarIconWithX = (props: ICalendarIconWithXProps) => {
  const { date, handleOnChange, hideRemoveIcon = false } = props
  return (
    <Flexbox align="center">
      {date && !hideRemoveIcon && (
        <Icon
          onClick={(event) => {
            event.stopPropagation()
            handleOnChange('')
          }}
          icon={X}
          size="sm"
          role="button"
          type="button"
          className="text-cool-600 mr-2"
        />
      )}
      <Calendar />
    </Flexbox>
  )
}

function NepaliDatepicker(props: INepaliDatePicker) {
  const {
    value,
    wrapperClassName,
    className,
    disabled,
    onChange,
    onSelect,
    options = {},
    closeOnSelect = true,
    maxDate,
    maxDateToday,
    minDate,
    id,
    minDateToday,
    name,
    onBlur,
    right = true,
    setExactToday,
    hideRemoveIcon,
  } = props

  const [date, setDate] = useState<string>('')
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const nepaliDatePickerInput = useRef<HTMLInputElement>(null)

  const [maxDateLimit, setMaxDateLimit] = useState({
    year: 0,
    month: 0,
    day: 0,
  })
  const [minDateLimit, setMinDateLimit] = useState({
    year: 0,
    month: 0,
    day: 0,
  })

  useEffect(() => {
    let maxDateMapped: string[] = []
    if (maxDate || maxDateToday) {
      if (maxDate) {
        maxDateMapped = maxDate?.split('-')
      } else if (maxDateToday) {
        maxDateMapped = ADToBS(new Date()).split('-')
      }
      setMaxDateLimit({
        year: +maxDateMapped[0],
        month: +maxDateMapped[1],
        day: +maxDateMapped[2],
      })
    } else {
      setMaxDateLimit({ year: 0, month: 0, day: 0 })
    }
  }, [maxDate, maxDateToday])

  useEffect(() => {
    let minDateMapped: string[] = []

    if (minDate || minDateToday) {
      if (minDate) {
        minDateMapped = minDate?.split('-')
      } else if (minDateToday) {
        minDateMapped = ADToBS(new Date()).split('-')
      }
      setMinDateLimit({
        year: +minDateMapped[0],
        month: +minDateMapped[1],
        day: +minDateMapped[2],
      })
    } else {
      setMinDateLimit({ year: 0, month: 0, day: 0 })
    }
  }, [minDate, minDateToday])

  const toggleDatePicker = () => setShowDatePicker(!showDatePicker)

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        showDatePicker &&
        nepaliDatePickerInput.current &&
        !nepaliDatePickerInput.current.contains(e.target as HTMLElement)
      ) {
        setShowDatePicker(false)
      }
    },
    [showDatePicker]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClickOutside])

  useEffect(() => {
    if (value) {
      try {
        if (value) {
          const [year, month, day] = value.split('-')

          if (!(year && month && day)) {
            throw new RangeError('Invalid BS date')
          }

          validateBsYear(+year)
          validateBsMonth(+month)
          validateBsDay(+day)

          setDate(value || '')
          // setemptyDateUpdateCount(0);
        }
      } catch (e) {
        setDate('')
        // onChange && onChange("", "");
      }
    } else {
      setDate('')
    }
  }, [value])

  const handleOnChange = useCallback(
    (changedDate: string) => {
      setDate(changedDate)
      if (onChange) {
        onChange(changedDate, changedDate ? BSToAD(changedDate) : null)
      }
    },
    [onChange]
  )

  const handleOnDaySelect = useCallback(
    (selectedDate: SplittedDate) => {
      if (closeOnSelect) {
        setShowDatePicker(false)
      }
      if (onSelect) {
        onSelect(stitchDate(selectedDate))
      }
    },
    [closeOnSelect, onSelect]
  )

  const datePickerEvents: NepaliDatepickerEvents = {
    change: handleOnChange,
    daySelect: handleOnDaySelect,
    todaySelect: handleOnDaySelect,
    yearSelect: options.yearSelect,
    monthSelect: options.monthSelect,
    previousMonthSelect: options.previousMonthSelect,
    nextMonthSelect: options.nextMonthSelect,
  }

  return (
    <Box
      className={`relative  ${wrapperClassName}`}
      onClick={toggleDatePicker}
      ref={nepaliDatePickerInput}
    >
      <input
        name={name}
        value={date ? convertEngToNepNumber(date) : date}
        {...(!right
          ? { leftIcon: <Calendar /> }
          : {
              rightIcon: (
                <CalendarIconWithX
                  date={date}
                  handleOnChange={handleOnChange}
                  hideRemoveIcon={hideRemoveIcon}
                />
              ),
            })}
        placeholder=""
        readOnly
        // containerClassName={className || ''}
        onBlur={onBlur}
        disabled={disabled}
        id={id}
        autoComplete="off"
        className="pl-4"
      />

      {showDatePicker && (
        <NepaliCalendar
          value={date}
          events={datePickerEvents}
          maxDate={maxDateLimit}
          minDate={minDateLimit}
          right={right}
          setExactToday={setExactToday}
        />
      )}
    </Box>
  )
}

export default NepaliDatepicker
