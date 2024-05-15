
import {Button} from '@mui/material';

export const CustomButton = ({ isDirty, isValid, children, type }: { isDirty: boolean; isValid: boolean; children: React.ReactNode; type?: string }) => {
	return( <Button type={type} href="" fullWidth variant='contained' disabled={!!(!isDirty || !isValid)}>
		{children}</Button>);
}

export default CustomButton;
