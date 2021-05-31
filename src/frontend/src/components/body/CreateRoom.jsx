import React from "react";
import { useFormik } from 'formik'
import {FormContainer, Input, SubmitButton} from "./common";
import {Marginer} from "../marginer";
import * as Services from "../../services/Room";

export function CreateRoomComponent() {
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            roomName: "",
        },
        onSubmit: async (values) => {
            let res = await Services.create(values);
            if(res.status === 200) {
                console.log(res.data)
            }
        }
    })
    return (
        <>
            <FormContainer id="createForm" onSubmit={handleSubmit}>
                <Input type="text" placeholder="Room Name" name="roomName" onChange={handleChange} values={values.roomName}/>
            </FormContainer>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" form="createForm">Create</SubmitButton>
        </>
    );
}
