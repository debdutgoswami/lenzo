import React from "react";

import {JoinRoomComponent} from "./JoinRoom";
import {CreateRoomComponent} from "./CreateRoom";
import {BoxContainer} from "./common";
import {Marginer} from "../marginer";

export function HomeComponent() {
  return (
    <BoxContainer>
      <CreateRoomComponent />
        <Marginer direction="vertical" margin="2.0em" />
      <JoinRoomComponent />
    </BoxContainer>
  );
}
