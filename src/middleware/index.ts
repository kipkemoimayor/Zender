import { NotAuthenticated } from '@feathersjs/errors'
import util from '../utils'

const { createHash, createSessionFile } = util

const middleware = {
  validateEntry: function (req: any, res: any, next: any) {
    if (req.method === 'POST') {
      console.log(req.url)
      console.log('===========')
      console.log(req.body.signed_request)
      console.log('===========')

      const mambuSignedRequest = req.body.signed_request
      if (!mambuSignedRequest) {
        throw new NotAuthenticated('Not authenticated')
      }
      const encodedString = mambuSignedRequest.split('.')[1]
      console.log('\n\n-----------------')
      console.log(createHash(encodedString))
      if (mambuSignedRequest.split('.')[0] === createHash(encodedString)) {
        console.log(createHash(encodedString))
        createSessionFile(mambuSignedRequest)
        req.requestIsValid = true
        req.method = 'GET'
        console.log('here:again')
        next()
      } else {
        throw new NotAuthenticated('Not authenticated')
      }
    } else {
      next()
    }
  }
}

export default middleware
