import { Breadcrumb } from './breadcrumb/breadcrumb';
import { ContentBlock } from './content-block/content-block';
import { ContentList } from './content-list/content-list';
import { CallToAction } from './call-to-action/call-to-action';
import { Classification } from './classification/classification';
import { Image } from './image/image';
import { Navigation } from './navigation/navigation';
import { SearchBox } from './search-box/search-box';
import { LoginForm } from './login-form/login-form';
import { ChangePassword } from './change-password/change-password';
import { ResetPassword } from './reset-password/reset-password';
import { Registration } from './registration/registration';
import { LanguageSelector } from './language-selector/language-selector';
import { Section } from './section/section';
import { WidgetRegistry } from '../editor/widget-framework/widget-registry';

import sitefinityContentBlockJson from './content-block/designer-metadata.json';
import sitefinitySectionJson from './section/designer-metadata.json';
import sitefinityContentListJson from './content-list/designer-metadata.json';
import sitefinityCallToActionJson from './call-to-action/designer-metadata.json';
import sitefinityClassificationJson from './classification/designer-metadata.json';
import sitefinityImageJson from './image/designer-metadata.json';
import sitefinityBreadcrumbJson from './breadcrumb/designer-metadata.json';
import sitefinityNavigationJson from './navigation/designer-metadata.json';
import sitefinitySearchBoxJson from './search-box/designer-metadata.json';
import sitefinityLoginFormJson from './login-form/designer-metadata.json';
import sitefinityChangePasswordJson from './change-password/designer-metadata.json';
import sitefinityResetPasswordJson from './reset-password/designer-metadata.json';
import sitefinityRegistrationJson from './registration/designer-metadata.json';
import sitefinityLanguageSelectorJson from './language-selector/designer-metadata.json';

import { EntityMetadataGenerator } from '@progress/sitefinity-widget-designers';
import { WidgetMetadata } from '../editor';
import { ClassificationEntity } from './classification/classification-entity';
import { ContentListEntity } from './content-list/content-list-entity';

export class ReactWidgetRegistry implements WidgetRegistry {
    private static _processed: any = null;

    private static _widgets: { [key: string]: WidgetMetadata; } = {
        'SitefinityBreadcrumb': {
            designerMetadata: sitefinityBreadcrumbJson,
            componentType: Breadcrumb,
            editorMetadata: {
                Title: 'Breadcrumb'
            },
            ssr: true
        },
        'SitefinityClassification':  <any>{
            entity: ClassificationEntity,
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
            entity: ContentListEntity,
            designerMetadata: sitefinityContentListJson,
            componentType: ContentList,
            editorMetadata: {
                Title: 'Content list',
                EmptyIconText: 'Select content',
                EmptyIcon: 'plus-circle'
            },
            ssr: true
        }
    };

    static get widgets(): { [key: string]: WidgetMetadata; } {
        if (!this._processed) {
            this._processed = {};

            for (const key in this._widgets) {
                if (Object.prototype.hasOwnProperty.call(this._widgets, key)) {
                    const element = this._widgets[key];
                    EntityMetadataGenerator.extractMetadata(element.entity);
                }
            }
        }

        return this._widgets;
    }
}
