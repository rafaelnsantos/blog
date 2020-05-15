export const fetcher = (query, variables = null) =>
  fetch('https://swapi.graph.cool/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })
    .then(res => res.json())
    .then(json => json.data)
    .catch(err => console.log(err))
