async function apiDog(urlApi:string):Promise<string> {
  return(  
    fetch(urlApi)
    .then((response)=>{
      return response.json()
    })
    .then(body=>{
      return body.message
    })
)}


export {apiDog}