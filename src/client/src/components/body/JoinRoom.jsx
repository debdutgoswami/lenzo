import React from "react";
import { useFormik } from 'formik'
import {FormContainer, Input, SubmitButton} from "./common";
import {Marginer} from "../marginer";
import {useHistory} from "react-router-dom";

export function JoinRoomComponent() {
    const history = useHistory();
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            roomId: "",
        },
        onSubmit: async (values) => {
            history.push(`/board/${values.roomId}`)
        }
    })
    return (
        <>
            <FormContainer id="joinForm" onSubmit={handleSubmit}>
                <Input type="text" placeholder="Room ID" name="roomId" onChange={handleChange} values={values.roomId}/>
            </FormContainer>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" form="joinForm" >Join</SubmitButton>
        </>
    );
}
