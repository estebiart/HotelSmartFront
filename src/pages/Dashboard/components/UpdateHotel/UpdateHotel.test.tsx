import React from 'react';
import { render } from '@testing-library/react';
import UpdateHotel from './UpdateHotel';

describe('UpdateHotel', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UpdateHotel />);

        expect(baseElement).toBeTruthy();
    });
});