import React from "react";

import {JoinRoomComponent} from "./JoinRoom";
import {CreateRoomComponent} from "./CreateRoom";
import {BoxContainer, SubmitButton} from "./common";
import {Marginer} from "../marginer";
import axios_instance from "../../services/axios";
import {apiUrl} from "../../config";
import {useHistory} from "react-router-dom";

export function HomeComponent() {
  const history = useHistory();
  const logout = async () => {
    await axios_instance.post(apiUrl+"/logout", {"refresh": localStorage.getItem("refresh_token")})
        .then(() => {
            localStorage.clear();
            history.push("/")
        })
  }
  return (
    <BoxContainer>
      <CreateRoomComponent />
        <Marginer direction="vertical" margin="2.0em" />
      <JoinRoomComponent />
        <Marginer direction="vertical" margin="2.0em" />
      <SubmitButton type="submit" onClick={logout}>Logout</SubmitButton>
    </BoxContainer>
  );
}
