import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Home />);

        expect(baseElement).toBeTruthy();


        await waitFor(() => {
            expect( screen.getByText('Pienso luego existo')).toBeInTheDocument();
        })
        
    });
});