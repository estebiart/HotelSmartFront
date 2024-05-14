
import {TextField, Typography} from '@mui/material';
import {useFormContext} from 'react-hook-form';
import styled from 'styled-components';

const fromValidation = ( errors, errorKey) => {
	return errors[errorKey] ? <Typography color="red">{ errors[errorKey].message} </Typography> : '';
}

export const CustomInput = ({name ='',label ='', type = 'text', disabled =false, required= false, multiple = false,defaultValue = ''}) =>{
	console.log("defaultValue",defaultValue);
	
	const {register, errors } = useFormContext(); 
	return (
		<CustomInputStl>
			<div>
				<TextField
						required ={required}
						{...(disabled ? {disabled}: {})} 
						type={type} 
						error={ errors && !!errors[name]} 
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
					{errors && fromValidation( errors, name)}
			</div>
		</CustomInputStl>
	);
};

export const CustomInputStl = styled.div`
     margin: 30px 0;
`;
