import util from '.'

export const addMonth = (date: string, month: number) => {
  date = date.split('/').reverse().join('-')
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + month)
  return util.fomartDate(newDate.toLocaleDateString())
}
