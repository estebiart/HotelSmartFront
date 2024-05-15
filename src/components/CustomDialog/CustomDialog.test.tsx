import { render } from '@testing-library/react';
import CustomDialog from './CustomDialog';

describe('CustomDialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <CustomDialog>
                 <p>test</p>
            </CustomDialog>
        );

        expect(baseElement).toBeTruthy();
    });
});
