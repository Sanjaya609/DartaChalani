import { format } from 'date-fns'

export const DefaultDateFormat = 'yyyy-MM-dd'

export default function formatDate(date?: string | Date) {
  if (!date) return ''
  const dateObject = new Date(date)
  return format(dateObject, DefaultDateFormat)
}

const addDays = (days: number, initDate?: Date) => {
  const date = initDate ? new Date(initDate) : new Date()
  date.setDate(date.getDate() + days)
  return date
}

export const getDatesBetweenRange = (
  startDate: string | Date,
  stopDate: string | Date
) => {
  const dates = []
  let currentDate = new Date(startDate)
  while (currentDate.valueOf() <= new Date(stopDate).valueOf()) {
    dates.push(formatDate(currentDate))
    currentDate = addDays(1, currentDate)
  }
  return dates
}

export const getMonth = (date: string) => {
  return new Date(date).toLocaleString('en-us', { month: 'short' })
}
