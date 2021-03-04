import config from '../config'
import TokenService from './token-service'

const LanguageService = {
    getLangAndWords() {
      return fetch(`${config.API_ENDPOINT}/language`,
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
   getNextWord() {
    return fetch(`${config.API_ENDPOINT}/language/head`,
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
   setGuess(input) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            'authorization':`bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({guess: input})
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
          )
   }
}

export default LanguageService