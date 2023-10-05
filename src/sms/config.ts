const axios = require('axios').default

const sms: any = {}

/**
 * Send a post request to create/send SMS
 * @param {*} data
 * @returns asynchronous object
 */
sms.createSMS = function (data: any) {
  axios.defaults.baseURL = 'https://api.smsleopard.com/v1/'
  // axios.defaults.headers.common['Accept'] = 'application/json';
  if (!data) {
    throw Error('Post data must be provider')
  }

  return axios.post('/sms/send', data, {
    headers: {
      Authorization: `Basic ${process.env.SMS_AUTH}`
    }
  })
}

export default sms
