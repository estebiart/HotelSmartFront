import  { useState } from 'react';
import { FormProvider, useForm} from 'react-hook-form';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Box } from '@mui/material';
import { AuthResponse } from '../../models/types';
import { useAuth } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { callEndpoint } from './services/call-endpoint';
import Layout from '../../layouts/Layout';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from './schemas';


export function Login() {
  const [errorResponse, setErrorResponse] = useState('');

  interface LoginFormData {
    username: string;
    password: string;
  }

  const methods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });


  const { handleSubmit } = methods;

  const { isDirty, isValid } = methods.formState;
  const auth = useAuth();

  const onSubmit = async (data:any) => {
    try {
      const result = await callEndpoint(data); 

      if (result) {
        const json = result as AuthResponse; 
        console.log(json);
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        setErrorResponse('Error al llamar al endpoint');
      }
    } catch (error) {
      setErrorResponse('Usuario o Contraseña no existen');
      console.log(error);
    }
    methods.reset();
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    
  <>
  <Layout>
    <LoginStl>
    <Box
        sx={{
          bgcolor: 'grey.300',
          borderRadius: '30px',
          p: '50px',
          width: '50%'
        }}
      >
        <h1>Ingresa a tu Dashboard</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="errorMessage">{errorResponse}</div>
            <CustomInput name="username" label="Nombre de Usuario" required />
            <CustomInput name="password" type="password" label="Contraseña" required />
            <CustomButton
              isDirty={isDirty}
              isValid={isValid}
              type="submit"
            >
              Iniciar sesión
            </CustomButton>
          </form>
        </FormProvider>
      </Box>
      </LoginStl>
  </Layout>
  </>
  );
}

export const LoginStl = styled.div`

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
    border-radius:10px
  }
`;

export default Login;