const Parameters = {UID: '26.2716025' & '50.2017993'}


export const task_register = async () => {
   let url = 'https://wainnakel.com/api/v1/GenerateFS.php?uid=26.2716025,50.2017993&get_param=value'
   const res = await fetch(url, {
       method: "POST",
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        uid: `${Parameters.UID.Longitude}${Parameters.UID.Latitude}`
       })
   })
    return res.json();
   
}  


