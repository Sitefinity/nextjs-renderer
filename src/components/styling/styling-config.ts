import { VisibilityStyle } from './visibility-style';

export const StylingConfig = {
    'ActiveClass': 'k-bg-success',
    'InvalidClass': 'k-bg-error',
    'CssGridSystemColumnCount': 12,
    'VideoBackgroundClass': '-sc-video',
    'ImageBackgroundClass': '-sc-image',
    'DefaultPadding': 'None',
    'DefaultMargin': 'None',

    'AlignmentClasses': {
        'Left': 'k-justify-content-start',
        'Center': 'k-justify-content-center',
        'Right': 'k-justify-content-end',
        'Justify': 'k-justify-content-between'
    },
    'VisibilityClasses': {
        [VisibilityStyle.Visible]:  'k-d-block',
        [VisibilityStyle.InlineVisible]: 'k-d-inline-block',
        [VisibilityStyle.Hidden]: 'k-d-none'
    },
    'SearchAutocompleteItemClass': 'dropdown-item text-truncate', // TODO: change with KENDO
    'ButtonClasses': {
        'Primary': {
            'Title': 'Primary action',
            'Value': 'btn btn-primary'
        },

        'Secondary': {
            'Title': 'Secondary action',
            'Value': 'btn btn-secondary'
        },

        'Link': {
            'Title': 'Link',
            'Value': ''
        }
    },
    'OffsetClasses': {
        'PaddingTopNONE': '',
        'PaddingTopS': 'k-pt-2',
        'PaddingTopM': 'k-pt-5',
        'PaddingTopL': 'k-pt-10',
        'PaddingLeftNONE': '',
        'PaddingLeftS': 'k-ps-2',
        'PaddingLeftM': 'k-ps-5',
        'PaddingLeftL': 'k-ps-10',
        'PaddingBottomNONE': '',
        'PaddingBottomS': 'k-pb-2',
        'PaddingBottomM': 'k-pb-5',
        'PaddingBottomL': 'k-pb-10',
        'PaddingRightNONE': '',
        'PaddingRightS': 'k-pe-2',
        'PaddingRightM': 'k-pe-5',
        'PaddingRightL': 'k-pe-10',
        'MarginTopNONE': '',
        'MarginTopS': 'k-mt-2',
        'MarginTopM': 'k-mt-5',
        'MarginTopL': 'k-mt-10',
        'MarginLeftNONE': '',
        'MarginLeftS': 'k-ms-2',
        'MarginLeftM': 'k-ms-5',
        'MarginLeftL': 'k-ms-10',
        'MarginBottomNONE': '',
        'MarginBottomS': 'k-mb-2',
        'MarginBottomM': 'k-mb-5',
        'MarginBottomL': 'k-mb-10',
        'MarginRightNONE': '',
        'MarginRightS': 'k-me-2',
        'MarginRightM': 'k-me-5',
        'MarginRightL': 'k-me-10'
    }
};
