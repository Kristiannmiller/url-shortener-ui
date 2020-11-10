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
export const postUrl = (longUrl, title) => {
  fetch('urlhere', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "long_url": longUrl,
      "title": title
    })
  })
  .then(response => {
    if (response.ok) {
      return response
    } else {
      throw Error
    }
  })
  .catch(error => {
    alert('Oops! Something went wrong. Please try again!')
  })
}
