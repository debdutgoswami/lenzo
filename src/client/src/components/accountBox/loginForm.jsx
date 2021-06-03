import React, { useContext } from "react";
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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as Services from '../../services/Auth';
import { useHistory } from 'react-router-dom'
import LocalStorageService from '../../services/LocalStorage'
import {toast} from "react-toastify";

const validationSchema = Yup.object().shape({
  username: Yup.string().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid username").required('required'),
  password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid Password").required("required")
})

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  let history = useHistory()
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values){
      await Services.login(values)
          .then((res) => {
              LocalStorageService.setToken(res.data)
              history.push("/")
          })
          .catch(() => toast.error("Invalid Credentials"));
    }
  })
  return (
    <BoxContainer>
      <FormContainer id="asd" onSubmit={handleSubmit}>
        <Input type="text" placeholder="username" onChange={handleChange} name="username"  values={values.username}/>
        <Input type="password" placeholder="Password" onChange={handleChange} name="password" values={values.password}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" form="asd" >Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?
        <BoldLink href="#register" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
