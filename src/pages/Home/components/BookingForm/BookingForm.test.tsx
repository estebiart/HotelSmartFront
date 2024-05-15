import { render } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BookingForm />);

        expect(baseElement).toBeTruthy();
    });
});