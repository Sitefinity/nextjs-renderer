import { VisibilityStyle } from "./visibility-style"

export const StylingConfig = {
    "ActiveClass": "active",
    "InvalidClass": "is-invalid",
    "CssGridSystemColumnCount": 12,
    "VideoBackgroundClass": "-sc-video",
    "ImageBackgroundClass": "-sc-image",
    "DefaultPadding": "None",
    "DefaultMargin": "None",

    "AlignmentClasses": {
        "Left": "justify-content-start",
        "Center": "justify-content-center",
        "Right": "justify-content-end",
        "Justify": "justify-content-between"
    },
    "VisibilityClasses": {
        [VisibilityStyle.Visible]:  "d-block",
        [VisibilityStyle.InlineVisible]: "d-inline-block",
        [VisibilityStyle.Hidden]: "d-none",
    },
    "SearchAutocompleteItemClass": "dropdown-item text-truncate",
    "ButtonClasses": {
        "Primary": {
            "Title": "Primary action",
            "Value": "btn btn-primary"
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
        'PaddingTopS': 'pt-3',
        'PaddingTopM': 'pt-4',
        'PaddingTopL': 'pt-5',
        'PaddingLeftNONE': '',
        'PaddingLeftS': 'ps-3',
        'PaddingLeftM': 'ps-4',
        'PaddingLeftL': 'ps-5',
        'PaddingBottomNONE': '',
        'PaddingBottomS': 'pb-3',
        'PaddingBottomM': 'pb-4',
        'PaddingBottomL': 'pb-5',
        'PaddingRightNONE': '',
        'PaddingRightS': 'pe-3',
        'PaddingRightM': 'pe-4',
        'PaddingRightL': 'pe-5',
        'MarginTopNONE': '',
        'MarginTopS': 'mt-3',
        'MarginTopM': 'mt-4',
        'MarginTopL': 'mt-5',
        'MarginLeftNONE': '',
        'MarginLeftS': 'ms-3',
        'MarginLeftM': 'ms-4',
        'MarginLeftL': 'ms-5',
        'MarginBottomNONE': '',
        'MarginBottomS': 'mb-3',
        'MarginBottomM': 'mb-4',
        'MarginBottomL': 'mb-5',
        'MarginRightNONE': '',
        'MarginRightS': 'me-3',
        'MarginRightM': 'me-4',
        'MarginRightL': 'me-5'
    }
};
