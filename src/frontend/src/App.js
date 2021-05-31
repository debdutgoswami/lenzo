import "./App.css";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom"
import { AccountBox } from "./components/accountBox";
import { HomeView } from "./views/home";
import Board from "./components/board/Board";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <Switch>
        <ProtectedRoute path="/" exact component={HomeView} />
        <Route path="/accounts" component={AccountBox} />
        <ProtectedRoute path="/board/:RoomID" component={Board} />
      </Switch>
    </AppContainer>
  );
}

export default App;
