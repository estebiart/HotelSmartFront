import React from 'react';
import { render } from '@testing-library/react';
import BookingList from './BookingList';

describe('BookingList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BookingList />);

        expect(baseElement).toBeTruthy();
    });
});