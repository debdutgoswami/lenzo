import React from "react";
import { getUser } from '../../services/Auth'
import  axios_instance from '../../services/axios'
import LocalStorageService from '../../services/LocalStorage';

export function Home(props) {
  window.addEventListener('load',
    async function fetchData() {
      try {
        const user_id = getUser().user_id;
        console.log(user_id)
        if(user_id){
         let res = await axios_instance.get('/token/is_active').catch(ex=>{
             // TODO handle rejected Promise and add the check to App.js to redirect to /accounts
         })
        }else {
          LocalStorageService.clearToken();
          props.history.push('/accounts');
        }
      }catch(ex) {
        console.log(ex)
      }
    });
  return (
    <div>
        <h2> HELLO WORLD</h2>
    </div>
  );
}
