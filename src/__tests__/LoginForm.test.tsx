import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import Login from "../pages/Login/Login";
import userEvent from "@testing-library/user-event";
import { LoginMock, LoginMockError } from "../_mocks_/Login.mock";
import axios from 'axios'; 


jest.mock('axios');

describe('Login', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);
    beforeEach(() => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: LoginMock });
        render(<Login/>);
    });

    it('should have two inputs on the screen', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        expect(usernameInput).toHaveValue("");
        expect(passwordInput).toHaveValue("");
        expect(submitButton).toBeDisabled();
    });

    it('should enable the submit button if the form values are valid', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        await userEvent.type(usernameInput, 'validUser');
        await userEvent.type(passwordInput, 'validPassword');

        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
        });
    });

    it('should disable the submit button if the form values are invalid', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        await userEvent.type(usernameInput, LoginMockError.name);
        await userEvent.type(passwordInput, LoginMockError.password);

        await waitFor(() => {
            expect(usernameInput).toHaveValue(LoginMockError.name);
            expect(passwordInput).toHaveValue(LoginMockError.password);
            expect(submitButton).toBeDisabled();
        });
    });

    it('should mock display form values', () => {
        expect(screen.getByText('Mocked Display')).toBeInTheDocument();
    });
});
