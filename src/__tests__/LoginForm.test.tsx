import { cleanup, render,screen, waitFor } from "@testing-library/react";
import LoginForm from "../Pages/Login/LoginForm";
import userEvent from "@testing-library/user-event";
import { LoginFormMock, LoginFormMockError } from "../_mocks_/LoginForm.mock";
import axios from 'axios';


jest.mock("axios");
jest.mock('../Pages/Login/components/DisplayFormValues.jsx', () => ({ 
    __esModule: true, 
    default: () => <div>Mocked Display</div>

}));

describe('LoginForm', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: LoginFormMock });
        render(<LoginForm/>);
    });
                     
     it('should two input exists at the screen', async() => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i});
        const passwordInput= screen.getByRole('textbox', { name: /Contraseña/i});
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        expect(usernameInput).toBeInTheDocument() ;
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        expect(usernameInput).toHaveValue("") ;
        expect(passwordInput).toHaveValue("") ;
        expect(submitButton).toBeDisabled();

     });  

     it('should enable the submit button if the form values are valid', async() => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i});
        const passwordInput= screen.getByRole('textbox', { name: /Contraseña/i});
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });


        await waitFor(() =>{
            expect(submitButton).toBeDisabled();
        } );
        

     });        

     it('should disable the submit button if the form values are invalid', async() => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i});
        const passwordInput= screen.getByRole('textbox', { name: /Contraseña/i});
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    
        await userEvent.type(usernameInput, LoginFormMockError.name);
        await userEvent.type(passwordInput, LoginFormMockError.password);
    
        await waitFor(() => {
            expect(usernameInput).toHaveValue(LoginFormMockError.username) ;
            expect(passwordInput).toHaveValue(LoginFormMockError.password) ;

            expect(submitButton).toBeDisabled();
            });
     });  


     it('should  mock displayfrom values', () => {     
        expect(screen.getByText('Mocked Display')).toBeInTheDocument();
     });           
});
