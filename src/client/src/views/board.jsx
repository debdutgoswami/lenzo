import Board from "../components/board/Board";

export function BoardView(props) {
    return(
        <Board roomId={props.computedMatch.params.roomId}/>
    );
}