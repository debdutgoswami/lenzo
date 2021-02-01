import React from "react";
import  axios_instance from '../../services/axios'
import LocalStorageService from '../../services/LocalStorage';

export function Home(props) {
  return (
    <div>
        <h2> HELLO FROM PROTECTED ROUTE </h2>
    </div>
  );
}
