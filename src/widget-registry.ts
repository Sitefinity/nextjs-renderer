
import { ContentBlock } from './widgets/content-block/content-block';
import { ContentList } from './widgets/content-list/content-list';
import { CallToAction } from './widgets/call-to-action/call-to-action';
import { Classification } from './widgets/classification/classification';
import { Image } from './widgets/image/image';
import { Breadcrumb } from './widgets/breadcrumb/breadcrumb';
import { Navigation } from './widgets/navigation/navigation';
import { SearchBox } from './widgets/search-box/search-box';
import { LoginForm } from './widgets/login-form/login-form';
import { ChangePassword } from './widgets/change-password/change-password';
import { ResetPassword } from './widgets/reset-password/reset-password';
import { Registration } from './widgets/registration/registration';
import { LanguageSelector } from './widgets/language-selector/language-selector';
import { Section } from './widgets/section/section';
import { WidgetRegistry } from './framework/editor/widgets/widget-registry';

import sitefinityContentBlockJson from './widgets/content-block/designer-metadata.json';
import sitefinitySectionJson from './widgets/section/designer-metadata.json';
import sitefinityContentListJson from './widgets/content-list/designer-metadata.json';
import sitefinityCallToActionJson from './widgets/call-to-action/designer-metadata.json';
import sitefinityClassificationJson from './widgets/classification/designer-metadata.json';
import sitefinityImageJson from './widgets/image/designer-metadata.json';
import sitefinityBreadcrumbJson from './widgets/breadcrumb/designer-metadata.json';
import sitefinityNavigationJson from './widgets/navigation/designer-metadata.json';
import sitefinitySearchBoxJson from './widgets/search-box/designer-metadata.json';
import sitefinityLoginFormJson from './widgets/login-form/designer-metadata.json';
import sitefinityChangePasswordJson from './widgets/change-password/designer-metadata.json';
import sitefinityResetPasswordJson from './widgets/reset-password/designer-metadata.json';
import sitefinityRegistrationJson from './widgets/registration/designer-metadata.json';
import sitefinityLanguageSelectorJson from './widgets/language-selector/designer-metadata.json';


export const widgetRegistry: WidgetRegistry = {
    widgets: {
        'SitefinityBreadcrumb':  <any>{
            designerMetadata: sitefinityBreadcrumbJson,
            componentType: Breadcrumb,
            editorMetadata: {
                Title: 'Breadcrumb'
            },
            ssr: true
        },
        'SitefinityClassification':  <any>{
            designerMetadata: sitefinityClassificationJson,
            componentType: Classification,
            editorMetadata: {
                Title: 'Classification'
            },
            ssr: true
        },
        'SitefinityImage':  <any>{
            designerMetadata: sitefinityImageJson,
            componentType: Image,
            editorMetadata: {
                Title: 'Image'
            },
            ssr: true
        },
        'SitefinityLoginForm':  <any>{
            designerMetadata: sitefinityLoginFormJson,
            componentType: LoginForm,
            editorMetadata: {
                Title: 'LoginForm'
            },
            ssr: true
        },
        'SitefinityChangePassword':  <any>{
            designerMetadata: sitefinityChangePasswordJson,
            componentType: ChangePassword,
            editorMetadata: {
                Title: 'Change Password'
            },
            ssr: true
        },
        'SitefinityResetPassword':  <any>{
            designerMetadata: sitefinityResetPasswordJson,
            componentType: ResetPassword,
            editorMetadata: {
                Title: 'Reset Password'
            },
            ssr: true
        },
        'LanguageSelector':  <any>{
            designerMetadata: sitefinityLanguageSelectorJson,
            componentType: LanguageSelector,
            editorMetadata: {
                Title: 'Language Selector'
            },
            ssr: true
        },
        'SitefinityRegistration':  <any>{
            designerMetadata: sitefinityRegistrationJson,
            componentType: Registration,
            editorMetadata: {
                Title: 'Registration'
            },
            ssr: true
        },
        'SitefinityNavigation':  <any>{
            designerMetadata: sitefinityNavigationJson,
            componentType: Navigation,
            editorMetadata: {
                Title: 'Navigation'
            },
            ssr: true
        },
        'SitefinitySearchBox':  <any>{
            designerMetadata: sitefinitySearchBoxJson,
            componentType: SearchBox,
            editorMetadata: {
                Title: 'SearchBox'
            },
            ssr: true
        },
        'SitefinityButton':  <any>{
            designerMetadata: sitefinityCallToActionJson,
            componentType: CallToAction,
            editorMetadata: {
                Title: 'Call to action'
            },
            ssr: true
        },
        'SitefinityContentBlock':  <any>{
            designerMetadata: sitefinityContentBlockJson,
            componentType: ContentBlock,
            editorMetadata: {
                Title: 'Content block'
            },
            ssr: true
        },
        'SitefinitySection': <any>{
            designerMetadata: sitefinitySectionJson,
            componentType: Section,
            selectorCategory: 'Layout',
            editorMetadata: {
                Title: 'Section'
            },
            ssr: true
        },
        'SitefinityContentList':  <any>{
            designerMetadata: sitefinityContentListJson,
            componentType: ContentList,
            editorMetadata: {
                Title: 'Content list',
                EmptyIconText: 'Select content',
                EmptyIcon: 'plus-circle'
            },
            ssr: true
        }
    }
};
