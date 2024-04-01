import { calendarData } from '@/components/functional/Datepicker/datePicker'
// eslint-disable-next-line import/no-cycle
import { SplittedDate } from '@/components/functional/Datepicker/datePickerProps'

export const range = (start: number, end: number, step = 1): number[] => {
  const list: number[] = []
  for (let i = start; i <= end; i += step) {
    list.push(i)
  }

  return list
}

const nepaliCount = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

export const convertEngToNepNumber = (number: number | string) => {
  return number
    ? number
        .toString()
        .split('')
        .map((numberItem: string) => {
          // eslint-disable-next-line no-console

          return nepaliCount[Number(numberItem)]
            ? nepaliCount[+numberItem]
            : numberItem
        })
        .join('')
    : number?.toString()
}

export const validateBsYear = (year: number) => {
  const midBsYear = calendarData.minBsYear
  const { maxBsYear } = calendarData

  if (year < midBsYear || year > maxBsYear) {
    throw new RangeError(
      `BS year should be in range of ${midBsYear} to ${maxBsYear}`
    )
  }
}

export const validateBsMonth = (month: number) => {
  if (month < 1 || month > 12) {
    throw new RangeError('BS month should be in range of 1 to 12')
  }
}

export const validateBsDay = (day: number) => {
  if (day < 1 || day > 32) {
    throw new RangeError('BS day should be in range of 1 to 32')
  }
}
export const getNumberOfDaysInBSMonth = (yearMonth: {
  year: number
  month: number
}): number => {
  const { year, month } = yearMonth
  validateBsYear(year)
  validateBsMonth(month)

  let yearCount = 0
  const totalYears = year + 1 - calendarData.minBsYear
  const bsMonthData: number[] = calendarData.extractedBsMonthData[month - 1]

  return bsMonthData?.reduce(
    (numberOfDays: number, monthData: number, index: number) => {
      if (monthData === 0 || numberOfDays !== 0) {
        return numberOfDays
      }

      const bsMonthUpperDaysIndex = index % 2
      yearCount += monthData
      if (totalYears > yearCount) {
        return numberOfDays
      }

      if ((year === 2085 && month === 5) || (year === 2088 && month === 5)) {
        return (
          calendarData.bsMonthUpperDays[month - 1][bsMonthUpperDaysIndex] - 2
        )
      }

      return calendarData.bsMonthUpperDays[month - 1][bsMonthUpperDaysIndex]
    },
    0
  )
}
export const zeroPad = (num: number): string => `${num > 9 ? num : `0${num}`}`

export const splitDate = (date: string, separator = '-'): SplittedDate => {
  const [year, month, day] = date.split(separator)

  return {
    day: parseInt(day, 10),
    month: parseInt(month, 10),
    year: parseInt(year, 10),
  }
}
export const stitchDate = (date: SplittedDate, separator = '-'): string => {
  return `${date.year}${separator}${zeroPad(date.month)}${separator}${zeroPad(
    date.day
  )}`
}
export const getDateObject = (date: string | Date) => {
  const today: Date = new Date(date)
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  return { year, month, day }
}
export const validateDateObject = (date: SplittedDate, type = 'BS') => {
  const { year, month, day } = date

  if (type === 'BS') {
    validateBsYear(year)
    validateBsMonth(month)
    validateBsDay(day)
  }
}

export const executionDelegation = (
  execution: () => void,
  delegatedExecution: () => void
) => {
  new Promise((resolve) => {
    execution()
    resolve(null)
  }).then(() => {
    delegatedExecution()
  })
}
