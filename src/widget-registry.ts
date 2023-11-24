
import { ContentBlock } from './components/content-block/content-block';
import { ContentList } from './components/content-list/content-list';
import { CallToAction } from './components/call-to-action/call-to-action';
import { Classification } from './components/classification/classification';
import { Image } from './components/image/image';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { Navigation } from './components/navigation/navigation';
import { SearchBox } from './components/search-box/search-box';
import { LoginForm } from './components/login-form/login-form';
import { ChangePassword } from './components/change-password/change-password';
import { ResetPassword } from './components/reset-password/reset-password';
import { Registration } from './components/registration/registration';
import { LanguageSelector } from './components/language-selector/language-selector';
import { Section } from './components/section/section';
import { WidgetRegistry } from './framework/editor/widgets/widget-registry';

import sitefinityContentBlockJson from './components/content-block/designer-metadata.json';
import sitefinitySectionJson from './components/section/designer-metadata.json';
import sitefinityContentListJson from './components/content-list/designer-metadata.json';
import sitefinityCallToActionJson from './components/call-to-action/designer-metadata.json';
import sitefinityClassificationJson from './components/classification/designer-metadata.json';
import sitefinityImageJson from './components/image/designer-metadata.json';
import sitefinityBreadcrumbJson from './components/breadcrumb/designer-metadata.json';
import sitefinityNavigationJson from './components/navigation/designer-metadata.json';
import sitefinitySearchBoxJson from './components/search-box/designer-metadata.json';
import sitefinityLoginFormJson from './components/login-form/designer-metadata.json';
import sitefinityChangePasswordJson from './components/change-password/designer-metadata.json';
import sitefinityResetPasswordJson from './components/reset-password/designer-metadata.json';
import sitefinityRegistrationJson from './components/registration/designer-metadata.json';
import sitefinityLanguageSelectorJson from './components/language-selector/designer-metadata.json';


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
