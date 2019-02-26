import { IS_FETCHING, FETCHING_SUCCESS, FETCHING_FAILED } from '../actions/actionTypes'



const Parameters = {UID: '26.2716025' & '50.2017993'}


export const task_register =  () => {
   let url = 'https://wainnakel.com/api/v1/GenerateFS.php?uid=26.2716025,50.2017993&get_param=value'
   return async (dispatch) => {
       dispatch({type: IS_FETCHING })
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
    const result = res.json();
   if(result){
        dispatch({FETCHING_SUCCESS, payload: result})
   }else {
        dispatch({FETCHING_FAILED})
   }
   
}  
}

