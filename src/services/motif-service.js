import config from '../config'
import TokenService from './token-service'

const MotifService = {
    getMotifs() {
      return fetch(`${config.API_ENDPOINT}/motif`,
      {headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
   },
   addNewMotif(){
    return fetch(`${config.API_ENDPOINT}/motif`,{
      method: 'POST',
      headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`,
        'content-type':'application/json'
      },
    })
  },
  //  getNextWord() {
  //   return fetch(`${config.API_ENDPOINT}/language/head`,
  //   {headers: {
  //       'authorization':`bearer ${TokenService.getAuthToken()}`
  //     }
  //   })      
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(err => Promise.reject(err))
  //         : res.json()
  //     )
  //  },
  //  setGuess(input) {
  //       return fetch(`${config.API_ENDPOINT}/language/guess`, {
  //           method: 'POST',
  //           headers: {
  //           'content-type': 'application/json',
  //           'authorization':`bearer ${TokenService.getAuthToken()}`
  //           },
  //           body: JSON.stringify({guess: input})
  //       })
  //       .then(res =>
  //           (!res.ok)
  //             ? res.json().then(err => Promise.reject(err))
  //             : res.json()
  //         )
  //  }
}

export default MotifService