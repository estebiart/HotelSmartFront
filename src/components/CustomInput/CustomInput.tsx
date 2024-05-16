import { TextField, Typography } from '@mui/material';
import { useFormContext, UseFormReturn, FieldValues, FieldError, FieldErrorsImpl, FieldErrors } from 'react-hook-form'; 
import styled from 'styled-components';

interface CustomInputProps {
    name?: string;
    label?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    defaultValue?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ name = '', label = '', type = 'text', disabled = false, required = false, multiple = false, defaultValue = '' }) => {

    const { register, formState }: UseFormReturn<FieldValues> = useFormContext();
    const error: FieldError | FieldErrorsImpl<any> | undefined = formState?.errors?.[name];

    return (
        <CustomInputStl>
            <div>
                <TextField
                    required={required}
                    {...(disabled ? { disabled } : {})}
                    type={type}
                    error={formState && !!formState.errors && !!formState.errors[name]}
                    id={name}
                    label={label}
                    variant='outlined'
                    value={defaultValue !== '' ? defaultValue : undefined}
                    {...register(name)}
                    fullWidth
                    inputProps={{
                        multiple: multiple ? 'multiple' : undefined,
                    }}
                />
                {error && (
                    <Typography color="red">
                        {(error as FieldError)?.message}
                    </Typography>
                )}
            </div>
        </CustomInputStl>
    );
};

const CustomInputStl = styled.div`
     margin: 30px 0;
`;
export default CustomInput;
