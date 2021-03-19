import config from '../config'
import TokenService from './token-service'

const FormService = {
    getForms() {
      return fetch(`${config.API_ENDPOINT}/form`, {
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
    addNewForm(){
      return fetch(`${config.API_ENDPOINT}/form`,{
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
    getFormById(id){
      return fetch(`${config.API_ENDPOINT}/form/${id}`,{
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
    deleteForm(id){
      return fetch(`${config.API_ENDPOINT}/form/${id}`,{
        method: 'DELETE',
        headers: {
          'authorization':`bearer ${TokenService.getAuthToken()}`,
          'content-type':'application/json'
        },
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : `Successfully deleted form ${id}`
      )
    },
    editForm(id, newData){
      return fetch(`${config.API_ENDPOINT}/form/${id}`,{
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

export default FormService