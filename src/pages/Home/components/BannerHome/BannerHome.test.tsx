import { render } from '@testing-library/react';
import BannerHome from './BannerHome';

describe('BannerHome', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BannerHome />);

        expect(baseElement).toBeTruthy();
    });
});