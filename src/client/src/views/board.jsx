import Board from "../components/board/Board";
import {useHistory} from "react-router-dom";

export function BoardView(props) {
    const history = useHistory();
    return(
        <Board roomId={props.computedMatch.params.roomId} history={history}/>
    );
}