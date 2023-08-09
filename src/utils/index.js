import dateformat from 'dateformat'

const format = 'yyyy-mm-dd'

export function todayString () {
  const taipeiTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
  return dateformat(taipeiTime, format)
}
