// methods GET, POST, PUT, DELETE
export default async function fetchUrl(url, method = 'GET', params) {
  let options = { method };

  if (method === 'PUT' || method === 'POST') {
    options.headers = {
      'Content-Type': 'application/json'
    };

    options.body = JSON.stringify(params);
  }

  // Make address an env
  const response = await fetch(`http://localhost:3000/${url}`, options);
  const data = await response.json();

  return data;
}
