import { calendarData } from '@/components/functional/Datepicker/datePicker'
// eslint-disable-next-line import/no-cycle
import { DayPickerProps } from '@/components/functional/Datepicker/datePickerProps'
import DayPickerBody from '@/components/functional/Datepicker/DayPicker/DayPickerBody'
import React from 'react'

function DayPicker(props: DayPickerProps) {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          {calendarData.bsDays.map((weekDay: string) => (
            <th
              className="overflow-hidden  p-2 text-sm font-normal"
              key={weekDay}
            >
              {weekDay}
            </th>
          ))}
        </tr>
      </thead>
      <DayPickerBody {...props} />
    </table>
  )
}

export default DayPicker
