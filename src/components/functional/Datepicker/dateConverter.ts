/* eslint-disable no-plusplus */
/* eslint-disable no-continue */

import { calendarData } from '@/components/functional/Datepicker/datePicker'
// eslint-disable-next-line import/no-cycle
import {
  ParsedDate,
  SplittedDate,
} from '@/components/functional/Datepicker/datePickerProps'
import {
  getDateObject,
  getNumberOfDaysInBSMonth,
  splitDate,
  stitchDate,
  validateDateObject,
} from '@/components/functional/Datepicker/datePickerUtils'

export const getDayIndex = (date: string) => {
  const formatDate = new Date(date)
  return formatDate.getDay()
}

export const getMonthIndex = (date: string) => {
  const formatDate = new Date(date)
  return formatDate.getMonth()
}
const getMonthDaysNumFormMinBsYear = (bsMonth: number, yearDiff: number) => {
  let yearCount = 0
  let monthDaysFromMinBsYear = 0
  if (yearDiff === 0) return 0

  const bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1]
  for (let i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      // eslint-disable-next-line no-continue
      continue
    }
    const bsMonthUpperDaysIndex = i % 2
    if (yearDiff > yearCount + bsMonthData[i]) {
      yearCount += bsMonthData[i]
      monthDaysFromMinBsYear +=
        calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] *
        bsMonthData[i]
    } else {
      monthDaysFromMinBsYear +=
        calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] *
        (yearDiff - yearCount)
      yearCount = yearDiff - yearCount
      break
    }
  }

  return monthDaysFromMinBsYear
}
const getTotalDaysNumFromMinBsYear = (
  bsYear: number,
  bsMonth: number,
  bsDate: number
) => {
  if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
    return null
  }

  let daysNumFromMinBsYear = 0
  const diffYears = bsYear - calendarData.minBsYear
  for (let month = 1; month <= 12; month++) {
    if (month < bsMonth) {
      daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears + 1)
    } else {
      daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears)
    }
  }

  if (bsYear > 2085 && bsYear < 2088) {
    daysNumFromMinBsYear += bsDate - 2
  } else if (bsYear === 2085 && bsMonth > 5) {
    daysNumFromMinBsYear += bsDate - 2
  } else if (bsYear > 2088) {
    daysNumFromMinBsYear += bsDate - 4
  } else if (bsYear === 2088 && bsMonth > 5) {
    daysNumFromMinBsYear += bsDate - 4
  } else {
    daysNumFromMinBsYear += bsDate
  }

  return daysNumFromMinBsYear
}

export const getBsMonthDays = (bsYear: number, bsMonth: number) => {
  let yearCount = 0
  const totalYears = bsYear + 1 - calendarData.minBsYear
  const bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1]
  for (let i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      continue
    }

    const bsMonthUpperDaysIndex = i % 2
    yearCount += bsMonthData[i]
    if (totalYears <= yearCount) {
      if (
        (bsYear === 2085 && bsMonth === 5) ||
        (bsYear === 2088 && bsMonth === 5)
      ) {
        return (
          +calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2
        )
      }
      return +calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex]
    }
  }

  return null
}

export const convertBStoAD = (
  bsYear: number,
  bsMonth: number,
  bsDate: number
) => {
  const daysNumFromMinBsYear = getTotalDaysNumFromMinBsYear(
    bsYear * 1,
    bsMonth * 1,
    bsDate * 1
  )
  const adDate = new Date(
    calendarData.minAdDateEqBsDate.ad.year,
    calendarData.minAdDateEqBsDate.ad.month,
    calendarData.minAdDateEqBsDate.ad.date - 1
  )
  if (daysNumFromMinBsYear)
    adDate.setDate(adDate.getDate() + daysNumFromMinBsYear)
  return adDate
}

export const convertADtoBS = (
  adYear: number,
  adMonth: number,
  adDate: number
) => {
  let bsYear = adYear * 1 + 57
  let bsMonth = (adMonth * 1 + 9) % 12
  bsMonth = bsMonth * 1 === 0 ? 12 : bsMonth
  let bsDate = 1

  if (adMonth < 4) {
    bsYear -= 1
  }

  const bsMonthFirstAdDate = convertBStoAD(bsYear, bsMonth, 1)
  if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
    if (adMonth === 4) {
      const bsYearFirstAdDate = convertBStoAD(bsYear, 1, 1)
      if (adDate < bsYearFirstAdDate.getDate()) {
        bsYear -= 1
      }
    }
    bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12
    const bsMonthDays: number | null = getBsMonthDays(bsYear, bsMonth)
    if (bsMonthDays)
      bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1
  } else {
    bsDate = adDate - bsMonthFirstAdDate.getDate() + 1
  }

  return { bsYear, bsMonth, bsDate }
}

export const ADToBS = (date: Date) => {
  const englishdate = getDateObject(date)
  const nepaliDate = convertADtoBS(
    englishdate.year,
    englishdate.month,
    englishdate.day
  )
  return stitchDate({
    year: nepaliDate.bsYear,
    month: nepaliDate.bsMonth,
    day: nepaliDate.bsDate,
  })
}
export const BSToAD = (date: string) => {
  const nepaliDate = date.split('-')
  const englishDate = convertBStoAD(
    +nepaliDate[0],
    +nepaliDate[1],
    +nepaliDate[2]
  )
  return new Date(englishDate)
}

export const parseBSDate = (date: string, separator = '-'): ParsedDate => {
  const { year, month, day }: SplittedDate = splitDate(date, separator)

  validateDateObject({ year, month, day })

  const adDate = new Date(BSToAD(date))
  const firstAdDateInBSMonth = new Date(
    BSToAD(stitchDate({ year, month, day: 1 }, separator))
  )
  const numberOfDaysInMonth = getNumberOfDaysInBSMonth({ year, month })

  return {
    adDate,
    bsDay: day,
    bsMonth: month,
    bsYear: year,
    firstAdDayInBSMonth: firstAdDateInBSMonth,
    numberOfDaysInBSMonth: numberOfDaysInMonth,
    weekDay: adDate.getDay(),
  }
}
