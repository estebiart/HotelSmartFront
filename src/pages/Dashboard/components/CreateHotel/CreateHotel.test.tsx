import { render } from '@testing-library/react';
import CreateHotel from './CreateHotel';

describe('CreateHotel', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CreateHotel />);

        expect(baseElement).toBeTruthy();
    });
});