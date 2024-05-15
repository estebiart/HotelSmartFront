import { render } from '@testing-library/react';
import HotelList from './HotelList';

describe('HotelList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<HotelList />);

        expect(baseElement).toBeTruthy();
    });
});