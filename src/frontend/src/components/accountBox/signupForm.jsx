import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik, ErrorMessage  } from 'formik'
import * as Yup from 'yup'
import * as Services from '../../services/User';
import { LoginForm } from './loginForm'
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('required'),
  name: Yup.string().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid Name").required('required'),
  username: Yup.string().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid username").required('required'),
  password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid Password").required("required")
})

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values){
      try {
        let response = await Services.register(values);
        if(response.status === 201) {
           switchToSignin();
        }
      }catch(e) {
        console.log(e)
      }
    }
  })
  return (
    <BoxContainer>
      <FormContainer id="asd" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Full Name" name="name" onChange={handleChange} values={values.name}/>
        <div className="errors">{errors.name ?errors.name: null}</div>
        <Input type="text" placeholder="Username" name="username" onChange={handleChange} values={values.username}/>
        <div className="errors">{errors.username ?errors.username: null}</div>
        <Input type="email" placeholder="Email" name="email" onChange={handleChange} values={values.email} />
        <div className="errors">{errors.email ?errors.email: null}</div>
        <Input type="password" placeholder="Password" name="password" onChange={handleChange} values={values.password} />
        <div className="errors">{errors.password ?errors.password: null}</div>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" form="asd">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
