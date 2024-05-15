import { render } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
    it('should render successfully', () => {
        const { getByText } = render(<Navbar layoutType="Layout" />); 

        expect(getByText('Hoteles Smart')).toBeInTheDocument();
    });
});