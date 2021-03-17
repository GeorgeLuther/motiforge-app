import config from '../config'
import TokenService from './token-service'

const MotifService = {
    getMotifs() {
      return fetch(`${config.API_ENDPOINT}/motif`, {
        headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`,
        'content-type':'application/json'
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
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
    },
    getMotifById(id){
      return fetch(`${config.API_ENDPOINT}/motif/${id}`,{
        method: 'GET',
        headers: {
          'authorization':`bearer ${TokenService.getAuthToken()}`,
          'content-type':'application/json'
        },
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
    },
    deleteMotif(id){
      return fetch(`${config.API_ENDPOINT}/motif/${id}`,{
        method: 'DELETE',
        headers: {
          'authorization':`bearer ${TokenService.getAuthToken()}`,
          'content-type':'application/json'
        },
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : `Successfully deleted motif ${id}`
      )
    },
    editMotif(id, newData){
      return fetch(`${config.API_ENDPOINT}/motif/${id}`,{
        method: 'PATCH',
        headers: {
          'authorization':`bearer ${TokenService.getAuthToken()}`,
          'content-type':'application/json'
        },
        body: JSON.stringify(newData)
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : `Your changes to ${newData.name} have been saved`
        )
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