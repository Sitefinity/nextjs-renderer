import { ContentBlock } from './content-block/content-block';
import { ContentList } from './content-list/content-list';
import { CallToAction } from './call-to-action/call-to-action';
import { Classification } from './classification/classification';
import { Image } from './image/image';
import { Breadcrumb } from './breadcrumb/breadcrumb';
import { Navigation } from './navigation/navigation';
import { SearchBox } from './search-box/search-box';
import { LoginForm } from './login-form/login-form';
import { ChangePassword } from './change-password/change-password';
import { ResetPassword } from './reset-password/reset-password';
import { Registration } from './registration/registration';
import { LanguageSelector } from './language-selector/language-selector';
import { Section } from './section/section';
import { WidgetRegistry, initRegistry } from '../editor/widget-framework/widget-registry';
import { DocumentList } from './document-list/document-list';
import { SearchResults } from './search-results/search-results';
import { SearchFacets } from './search-facets/search-facets';
import { Form } from './form/form';
import { Checkboxes } from './form-widgets/checkboxes/checkboxes';
import { FormContentBlock } from './form-widgets/content-block/content-block';
import { Dropdown } from './form-widgets/dropdown/dropdown';
import { DynamicList } from './form-widgets/dynamic-list/dynamic-list';
import { FileUpload } from './form-widgets/file-upload/file-upload';
import { MultipleChoice } from './form-widgets/multiple-choice/multiple-choice';
import { Paragraph } from './form-widgets/paragraph/paragraph';
import { SubmitButton } from './form-widgets/submit-button/submit-button';
import { TextField } from './form-widgets/textfield/textfield';
import { ClassificationEntity } from './classification/classification-entity';
import { ContentListEntity } from './content-list/content-list-entity';
import { SectionEntity } from './section/section.entity';
import { ImageEntity } from './image/image.entity';
import { ContentBlockEntity } from './content-block/content-block.entity';

import sitefinityCallToActionJson from './call-to-action/designer-metadata.json';
import sitefinityBreadcrumbJson from './breadcrumb/designer-metadata.json';
import sitefinityNavigationJson from './navigation/designer-metadata.json';
import sitefinitySearchBoxJson from './search-box/designer-metadata.json';
import sitefinityLoginFormJson from './login-form/designer-metadata.json';
import sitefinityChangePasswordJson from './change-password/designer-metadata.json';
import sitefinityResetPasswordJson from './reset-password/designer-metadata.json';
import sitefinityRegistrationJson from './registration/designer-metadata.json';
import sitefinityLanguageSelectorJson from './language-selector/designer-metadata.json';
import sitefinityDocumentListJson from './document-list/designer-metadata.json';
import sitefinitySearchResultsListJson from './search-results/designer-metadata.json';
import sitefinityFormListJson from './form/designer-metadata.json';
import sitefinityCheckboxesJson from './form-widgets/checkboxes/designer-metadata.json';
import sitefinityFormContentBlockJson from './form-widgets/content-block/designer-metadata.json';
import sitefinityDropdownJson from './form-widgets/dropdown/designer-metadata.json';
import sitefinityDynamicListJson from './form-widgets/dynamic-list/designer-metadata.json';
import sitefinityFileUploadJson from './form-widgets/file-upload/designer-metadata.json';
import sitefinityMultipleChoiceJson from './form-widgets/multiple-choice/designer-metadata.json';
import sitefinityParagraphJson from './form-widgets/paragraph/designer-metadata.json';
import sitefinitySubmitButtonJson from './form-widgets/submit-button/designer-metadata.json';
import sitefinityTextFieldJson from './form-widgets/textfield/designer-metadata.json';
import { SearchFacetsEntity } from './search-facets/search-facets.entity';

export const widgetRegistry: WidgetRegistry = initRegistry({
    widgets: {
        'SitefinityBreadcrumb': {
            designerMetadata: sitefinityBreadcrumbJson,
            componentType: Breadcrumb,
            editorMetadata: {
                Title: 'Breadcrumb'
            },
            ssr: true
        },
        'SitefinityClassification': {
            entity: ClassificationEntity,
            componentType: Classification,
            editorMetadata: {
                Title: 'Classification'
            },
            ssr: true
        },
        'SitefinityImage': {
            entity: ImageEntity,
            componentType: Image,
            editorMetadata: {
                Title: 'Image'
            },
            ssr: true
        },
        'SitefinityLoginForm': {
            designerMetadata: sitefinityLoginFormJson,
            componentType: LoginForm,
            editorMetadata: {
                Title: 'LoginForm'
            },
            ssr: true
        },
        'SitefinityChangePassword': {
            designerMetadata: sitefinityChangePasswordJson,
            componentType: ChangePassword,
            editorMetadata: {
                Title: 'Change Password'
            },
            ssr: true
        },
        'SitefinityResetPassword': {
            designerMetadata: sitefinityResetPasswordJson,
            componentType: ResetPassword,
            editorMetadata: {
                Title: 'Reset Password'
            },
            ssr: true
        },
        'LanguageSelector': {
            designerMetadata: sitefinityLanguageSelectorJson,
            componentType: LanguageSelector,
            editorMetadata: {
                Title: 'Language Selector'
            },
            ssr: true
        },
        'SitefinityRegistration': {
            designerMetadata: sitefinityRegistrationJson,
            componentType: Registration,
            editorMetadata: {
                Title: 'Registration'
            },
            ssr: true
        },
        'SitefinityNavigation': {
            designerMetadata: sitefinityNavigationJson,
            componentType: Navigation,
            editorMetadata: {
                Title: 'Navigation'
            },
            ssr: true
        },
        'SitefinitySearchBox': {
            designerMetadata: sitefinitySearchBoxJson,
            componentType: SearchBox,
            editorMetadata: {
                Title: 'SearchBox'
            },
            ssr: true
        },
        'SitefinityButton': {
            designerMetadata: sitefinityCallToActionJson,
            componentType: CallToAction,
            editorMetadata: {
                Title: 'Call to action'
            },
            ssr: true
        },
        'SitefinityContentBlock': {
            entity: ContentBlockEntity,
            componentType: ContentBlock,
            editorMetadata: {
                Title: 'Content block'
            },
            ssr: true
        },
        'SitefinitySection':{
            entity: SectionEntity,
            componentType: Section,
            selectorCategory: 'Layout',
            editorMetadata: {
                Title: 'Section'
            },
            ssr: true
        },
        'SitefinityContentList': {
            entity: ContentListEntity,
            componentType: ContentList,
            editorMetadata: {
                Title: 'Content list',
                EmptyIconText: 'Select content',
                EmptyIcon: 'plus-circle'
            },
            ssr: true
        },
        'SitefinityDocumentList': {
            designerMetadata: sitefinityDynamicListJson,
            componentType: DocumentList,
            editorMetadata: {
                Title: 'Document list',
                EmptyIconText: 'Select document',
                EmptyIcon: 'plus-circle'
            },
            ssr: true
        },
        'SitefinitySearchResults': {
            designerMetadata: sitefinitySearchResultsListJson,
            componentType: SearchResults,
            editorMetadata: {
                Title: 'Search Results',
                EmptyIconText: 'Search results',
                EmptyIcon: 'search'
            },
            ssr: true
        },
        'SitefinityFacets': {
            entity: SearchFacetsEntity,
            componentType: SearchFacets,
            editorMetadata: {
                Title: 'Search facets',
                EmptyIconText: 'Select search facets',
                EmptyIcon: 'search'
            },
            ssr: true
        },
        'SitefinityForm': {
            designerMetadata: sitefinityFormListJson,
            componentType: Form,
            editorMetadata: {
                Title: 'Search facets',
                EmptyIconText: 'Select search facets',
                EmptyIcon: 'search'
            },
            ssr: true
        },
        'SitefinityCheckboxes': {
            designerMetadata: sitefinityCheckboxesJson,
            componentType: Checkboxes,
            editorMetadata: {
                Title: 'Checkboxes'
            },
            ssr: true
        },
        'SitefinityFormContentBlock': {
            designerMetadata: sitefinityFormContentBlockJson,
            componentType: FormContentBlock,
            editorMetadata: {
                Title: 'Content Block'
            },
            ssr: true
        },
        'SitefinityDropdown': {
            designerMetadata: sitefinityDropdownJson,
            componentType: Dropdown,
            editorMetadata: {
                Title: 'Dropdown'
            },
            ssr: true
        },
        'SitefinityDynamicList': {
            designerMetadata: sitefinityDocumentListJson,
            componentType: DynamicList,
            editorMetadata: {
                Title: 'Dynamic List'
            },
            ssr: true
        },
        'SitefinityFileField': {
            designerMetadata: sitefinityFileUploadJson,
            componentType: FileUpload,
            editorMetadata: {
                Title: 'File Upload'
            },
            ssr: true
        },
        'SitefinityMultipleChoice': {
            designerMetadata: sitefinityMultipleChoiceJson,
            componentType: MultipleChoice,
            editorMetadata: {
                Title: 'Multiple Choice'
            },
            ssr: true
        },
        'SitefinityParagraph': {
            designerMetadata: sitefinityParagraphJson,
            componentType: Paragraph,
            editorMetadata: {
                Title: 'Paragraph'
            },
            ssr: true
        },
        'SitefinitySubmitButton': {
            designerMetadata: sitefinitySubmitButtonJson,
            componentType: SubmitButton,
            editorMetadata: {
                Title: 'Submit Button'
            },
            ssr: true
        },
        'SitefinityTextField': {
            designerMetadata: sitefinityTextFieldJson,
            componentType: TextField,
            editorMetadata: {
                Title: 'TextField'
            },
            ssr: true
        }
    }
});
