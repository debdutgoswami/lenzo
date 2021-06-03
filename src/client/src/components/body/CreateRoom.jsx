import React from "react";
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import {FormContainer, Input, SubmitButton} from "./common";
import {Marginer} from "../marginer";
import * as Services from "../../services/Room";
import {useHistory} from "react-router-dom";

export function CreateRoomComponent() {
    const history = useHistory();
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            roomName: "",
        },
        onSubmit: async (values) => {
            await Services.create(values)
                .then((res) => history.push(`/board/${res.data.message.id}`))
                .catch(() => toast.error("Some Error Occurred"));
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
