import { render } from '@testing-library/react';
import HotelCard from './HotelCard';

describe('HotelCard', () => {
    const mockHotel = {
        name: 'Hotel Example',
        place: 'Example City',
        images: ['image1.jpg', 'image2.jpg'],
        description: 'Lorem ipsum dolor sit amet',
    };

    it('should render successfully', () => {
        const { getByText } = render(<HotelCard hotel={mockHotel} />);
        expect(getByText('Hotel Example')).toBeInTheDocument();
        expect(getByText('Example City')).toBeInTheDocument();

        expect(getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
    });
});
