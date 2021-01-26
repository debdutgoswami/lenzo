import React from "react";
import  axios_instance from '../../services/axios'
import LocalStorageService from '../../services/LocalStorage';

export function Home(props) {
  window.addEventListener('load',
    async function fetchData() {
     let res = await axios_instance.get('/token/is_active').catch(ex=>{
         LocalStorageService.clearToken();
         props.history.push('/accounts');
     })
  });
  return (
    <div>
        <h2> HELLO WORLD</h2>
    </div>
  );
}
