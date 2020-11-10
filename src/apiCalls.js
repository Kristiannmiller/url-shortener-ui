export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    return 'No links yet, go find some!'
  })
}
