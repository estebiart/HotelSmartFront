import React from 'react';
import { render } from '@testing-library/react';
import CustomDialog from './CustomDialog';

describe('CustomDialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomDialog />);

        expect(baseElement).toBeTruthy();
    });
});