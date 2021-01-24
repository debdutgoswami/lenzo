import React, { useEffect } from "react";
import { getUser } from '../../services/Auth'
import  axios_instance from '../../services/axios'
export function Home(props) {

  useEffect(() =>{
    async function fetchdata() {
      try {
        if(getUser){
         let res = await axios_instance.get('/token/is_active')
         console.log(res)
        }
      }catch(ex) {
        console.log(ex)
      }
    }
    fetchdata()
  },[])
  return (
    <div>
        <h2> HELLO WORLD</h2>
    </div>
  );
}
