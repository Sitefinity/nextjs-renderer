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
        'PaddingTopS': '!k-pt-5',
        'PaddingTopM': '!k-pt-10',
        'PaddingTopL': '!k-pt-20',
        'PaddingLeftNONE': '',
        'PaddingLeftS': '!k-pl-5',
        'PaddingLeftM': '!k-pl-10',
        'PaddingLeftL': '!k-pl-20',
        'PaddingBottomNONE': '',
        'PaddingBottomS': '!k-pb-5',
        'PaddingBottomM': '!k-pb-10',
        'PaddingBottomL': '!k-pb-20',
        'PaddingRightNONE': '',
        'PaddingRightS': '!k-pr-5',
        'PaddingRightM': '!k-pr-10',
        'PaddingRightL': '!k-pr-20',
        'MarginTopNONE': '',
        'MarginTopS': '!k-mt-5',
        'MarginTopM': '!k-mt-10',
        'MarginTopL': '!k-mt-20',
        'MarginLeftNONE': '',
        'MarginLeftS': '!k-ml-5',
        'MarginLeftM': '!k-ml-10',
        'MarginLeftL': '!k-ml-20',
        'MarginBottomNONE': '',
        'MarginBottomS': '!k-mb-5',
        'MarginBottomM': '!k-mb-10',
        'MarginBottomL': '!k-mb-20',
        'MarginRightNONE': '',
        'MarginRightS': '!k-mr-5',
        'MarginRightM': '!k-mr-10',
        'MarginRightL': '!k-mr-20'
    }
};
