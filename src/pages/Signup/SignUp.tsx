import { useState } from "react";
import { FormProvider, useForm , Resolver} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../../models/types";
import { useAuth } from "../../context/AuthProvider";
import { CustomButton, CustomInput } from "../../components";
import styled from 'styled-components';
import { Box } from '@mui/material';
import { callEndpoint } from "./services/call-endpoint";
import { SignUpFormSchema } from "./schemas/sign-form-schema";

export default function Signup() {
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();

  const formDataToObject = (formData: FormData): { [key: string]: any } => {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };

  const customYupResolver: Resolver<any> = async (formData, context, options) => {
    const data = formDataToObject(formData);
    return yupResolver(SignUpFormSchema)(data, context, options);
  };

  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: customYupResolver,
  })


  const { handleSubmit } = methods;
  const { errors, isDirty, isValid } = methods.formState;

  async function onSubmit(data: FormData) {
    try {
      const result = await callEndpoint(data);
      if (result) {
        const json = result as AuthResponse;
        auth.saveUser(json);
        goTo("/");
        return;
      } else {
        setErrorResponse('Error al llamar al endpoint');
      }
    } catch (error) {
      setErrorResponse('Intente con otro nombre de Usuario');
      console.log(error);
    }
    methods.reset();
  }

  return (
    <Layout>
      <SignUpStl>
        <Box
          sx={{
            bgcolor: 'grey.300',
            borderRadius: '30px',
            p: '50px',
            width: '50%'
          }}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <h1>Registro</h1>
              {!!errorResponse && (
                <div className="errorMessage">{errorResponse}</div>
              )}
              <CustomInput
                name="name"
                label="Nombre"
                type="text"
                required
              />
              <CustomInput
                name="username"
                label="Nombre de Usuario"
                type="text"
                required
              />
              <CustomInput
                name="password"
                label="Contraseña"
                type="password"
                required
              />
              <CustomButton
                isDirty={isDirty}
                isValid={isValid}
                type="submit"
              >
                Crear Cuenta
              </CustomButton>
            </form>
          </FormProvider>
        </Box>
      </SignUpStl>
    </Layout>
  );
}

export const SignUpStl = styled.div`
  height:100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  .MuiBox-root{
    max-width:400px
  }
  .errorMessage{
    color:white;
    background:red;
    border-radius:10px;
  }
`;
