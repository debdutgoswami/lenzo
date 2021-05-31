import React from "react";
import { useFormik } from 'formik'
import {FormContainer, Input, SubmitButton} from "./common";
import {Marginer} from "../marginer";

export function JoinRoomComponent() {
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            roomId: "",
        },
        onSubmit: async (values) => {
            console.log(values)
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
