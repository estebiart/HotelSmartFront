import React from 'react';
import { render } from '@testing-library/react';
import HotelCard from './HotelCard';

describe('HotelCard', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<HotelCard />);

        expect(baseElement).toBeTruthy();
    });
});