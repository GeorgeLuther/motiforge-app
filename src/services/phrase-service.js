import config from '../config'
import TokenService from './token-service'

const PhraseService = {
    getPhrases() {
      return fetch(`${config.API_ENDPOINT}/phrase`, {
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
    addNewPhrase(){
      return fetch(`${config.API_ENDPOINT}/phrase`,{
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
    getPhraseById(id){
      return fetch(`${config.API_ENDPOINT}/phrase/${id}`,{
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
    deletePhrase(id){
      return fetch(`${config.API_ENDPOINT}/phrase/${id}`,{
        method: 'DELETE',
        headers: {
          'authorization':`bearer ${TokenService.getAuthToken()}`,
          'content-type':'application/json'
        },
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : `Successfully deleted phrase ${id}`
      )
    },
    editPhrase(id, newData){
      return fetch(`${config.API_ENDPOINT}/phrase/${id}`,{
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
}

export default PhraseService