import { render } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <CustomButton
                isDirty= {true}
                isValid={true}
                type="submit"
            >
                Submit
            </CustomButton>
        );

        expect(baseElement).toBeTruthy();
    });
});
