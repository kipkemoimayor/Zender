import util from '.'

export const addMonth = (date: string, month: number) => {
  date = date.split('/').reverse().join('-')
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + month)
  return util.fomartDate(newDate.toLocaleDateString())
}

export const changeDate = (date: Date, type: 'endDay' | 'startDay') => {
  const changeDate = new Date(date)
  if (type == 'endDay') {
    changeDate.setHours(23)
    changeDate.setMinutes(59)
    changeDate.setSeconds(59)
  } else {
    changeDate.setHours(0)
    changeDate.setMinutes(0)
    changeDate.setSeconds(0)
  }

  return changeDate
}
