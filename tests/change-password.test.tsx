import { render, waitFor } from '@testing-library/react';
import { describe } from 'node:test';
import { MockedClassificationRestService } from './mocks/mock-classification.service';
import { ChangePassword } from '../src/nextjs-framework/widgets/change-password/change-password';

// All tests skipped because of https://github.com/Sitefinity/nextjs-renderer/issues/26
describe('should render change password', () => {
    it.skip('with empty model', async () => {
        const model = {};

        const requestContext = {};

        const component = await ChangePassword({ model, requestContext, metadata, restService: MockedClassificationRestService });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it.skip('with default model', async () => {
        const model = {};

        const requestContext = {};

        const component = await ChangePassword({ model, requestContext, metadata, restService: MockedClassificationRestService });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityChangePassword',
        Caption: 'ChangePassword',
        PropertyMetadata: [[Object], [Object]]
    },
    componentType: [ChangePassword],
    editorMetadata: { Title: 'ChangePassword' },
    ssr: true
};
