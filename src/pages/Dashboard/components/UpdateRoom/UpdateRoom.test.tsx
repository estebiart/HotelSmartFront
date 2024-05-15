import React from 'react';
import { render } from '@testing-library/react';
import UpdateRoom from './UpdateRoom';

describe('UpdateRoom', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UpdateRoom />);

        expect(baseElement).toBeTruthy();
    });
});