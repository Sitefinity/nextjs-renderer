import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { PostLoginAction } from './interfaces/PostLoginAction';
import { StylingConfig } from '../styling/styling-config';
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId';
import { RestExtensionsService } from 'sitefinity-react-framework/sdk/rest-extensions';
import { RestSdkTypes, RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { FilterConverterService } from 'sitefinity-react-framework/sdk/filters/filter-converter';
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { ExternalLoginBase } from 'sitefinity-react-framework/login/external-login-base';
import { ExternalProvider } from 'sitefinity-react-framework/sdk/dto/external-provider';
import { CollectionResponse } from 'sitefinity-react-framework/sdk/dto/collection-response';
import { FormContainer } from './form-container';

const defaultMixedContent = {
    ItemIdsOrdered:null,
    Content:[ {
        Type:RestSdkTypes.Pages,
        Variations:null
    }]
};

export async function LoginForm(props: WidgetContext<LoginFormEntity>) {
    const entity = {
        PostLoginRedirectPage: defaultMixedContent,
        RegistrationPage: defaultMixedContent,
        ResetPasswordPage: defaultMixedContent,
        PostLoginAction: 0,
        Header: 'Login',
        EmailLabel: 'Email / Username',
        PasswordLabel: 'Password',
        SubmitButtonLabel: 'Log in',
        ErrorMessage: 'Incorrect credentials.',
        RememberMeLabel: 'Remember me',
        ForgottenPasswordLinkLabel: 'Forgotten password',
        NotRegisteredLabel: 'Not registered yet?',
        RegisterLinkText: 'Register now',
        ExternalProvidersHeader: 'or use account in...',
        ValidationRequiredMessage: 'All fields are required.',
        ValidationInvalidEmailMessage: 'Invalid email format.',
        ...props.model.Properties
    };
    const context = props.requestContext;
    const dataAttributes = htmlAttributes(props);
    const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: any = {
        LoginHandlerPath: '/sitefinity/login-handler',
        RememberMe: entity.RememberMe,
        MembershipProviderName: entity.MembershipProviderName,
        Attributes: entity.Attributes,
        Labels: {}
    };

    if (entity.ExternalProviders && entity.ExternalProviders.length){
        const argsLocal = {
            Name: 'Default.GetExternalProviders'
        };
        const externalProviders: CollectionResponse<ExternalProvider> = await RestService.getUnboundType(argsLocal);
        viewModel.ExternalProviders = externalProviders.Items.filter(p => entity.ExternalProviders?.indexOf(p.Name) !== -1);
    }

    viewModel.Labels.EmailLabel = entity.EmailLabel;
    viewModel.Labels.ErrorMessage = entity.ErrorMessage;
    viewModel.Labels.ExternalProvidersHeader = entity.ExternalProvidersHeader;
    viewModel.Labels.ForgottenPasswordLinkLabel = entity.ForgottenPasswordLinkLabel;
    viewModel.Labels.Header = entity.Header;
    viewModel.Labels.NotRegisteredLabel = entity.NotRegisteredLabel;
    viewModel.Labels.PasswordLabel = entity.PasswordLabel;
    viewModel.Labels.RegisterLinkText = entity.RegisterLinkText;
    viewModel.Labels.RememberMeLabel = entity.RememberMeLabel;
    viewModel.Labels.SubmitButtonLabel = entity.SubmitButtonLabel;
    viewModel.Labels.ValidationInvalidEmailMessage = entity.ValidationInvalidEmailMessage;
    viewModel.Labels.ValidationRequiredMessage = entity.ValidationRequiredMessage;
    viewModel.VisibilityClasses = StylingConfig.VisibilityClasses;
    viewModel.InvalidClass = StylingConfig.InvalidClass;

    const postLoginRedirectVariations = (entity.PostLoginRedirectPage.Content)[0].Variations;
    if (entity.PostLoginAction === PostLoginAction.RedirectToPage
    && postLoginRedirectVariations && postLoginRedirectVariations.length !== 0){
        const mainFilter = FilterConverterService.getMainFilter(postLoginRedirectVariations[0]);
        const pageNodes = await RestExtensionsService.getContextItems(entity.PostLoginRedirectPage, {
            Type: RestSdkTypes.Pages,
            Fields: ['ViewUrl'],
            Filter: mainFilter
        });
        const items = pageNodes.Items;
        if (items.length === 1){
            viewModel.RedirectUrl =  items[0].ViewUrl;
        }
    }

    const registrationVariations = (entity.RegistrationPage.Content)[0].Variations;
    if (registrationVariations && registrationVariations.length !== 0){
        const mainFilter = FilterConverterService.getMainFilter(registrationVariations[0]);
        const pageNodes = await RestExtensionsService.getContextItems(entity.RegistrationPage, {
            Type: RestSdkTypes.Pages,
            Fields: ['ViewUrl'],
            Filter: mainFilter
        });

        const items = pageNodes.Items;
        if (items.length === 1){
            viewModel.RegistrationLink =  items[0].ViewUrl;
        }
    }

    const resetPasswordVariations = (entity.ResetPasswordPage.Content)[0].Variations;
    if (resetPasswordVariations && resetPasswordVariations.length !== 0){
        const mainFilter = FilterConverterService.getMainFilter(resetPasswordVariations[0]);
        const pageNodes = await RestExtensionsService.getContextItems(entity.ResetPasswordPage, {
            Type: RestSdkTypes.Pages,
            Fields: ['ViewUrl'],
            Filter: mainFilter
        });

        const items = pageNodes.Items;
        if (items.length === 1){
            viewModel.ForgottenPasswordLink = items[0].ViewUrl;
        }
    }

    const labels = viewModel.Labels;
    const usernameInputId = getUniqueId('sf-username-');
    const passwordInputId = getUniqueId('sf-password-');
    const rememberInputId = getUniqueId('sf-rememeber-');

    return (
      <div
        {...dataAttributes}
        >
        <FormContainer viewModel={viewModel} context={context}
          usernameInputId={usernameInputId}
          passwordInputId={passwordInputId}
          rememberInputId={rememberInputId}
             />
        {viewModel.RegistrationLink &&
        <div className="row mt-3">
          <div className="col-md-6">{labels.NotRegisteredLabel}</div>
          <div className="col-md-6 text-end"><a href={viewModel.RegistrationLink}
            className="text-decoration-none">{labels.RegisterLinkText}</a></div>
        </div>
    }

        {viewModel.ExternalProviders && viewModel.ExternalProviders.length &&

        [<h3 key={100} className="mt-3">{labels.ExternalProvidersHeader}</h3>,
            viewModel.ExternalProviders.map((provider: ExternalProvider, idx: number) => {
                const providerClass = ExternalLoginBase.GetExternalLoginButtonCssClass(provider.Name);
                const providerHref = ExternalLoginBase.GetExternalLoginPath(context, provider.Name);

                return (
                  <a key={idx}
                    className={classNames('btn border fs-5 w-100 mt-2',providerClass)}
                    href={providerHref}>{provider.Value}</a>
                );
            })
        ]
    }
      </div>
    );
}

export class LoginFormEntity {
    Attributes?: any[];
    CssClass?: string;
    Margins?: OffsetStyle;
    PostLoginAction?: PostLoginAction;
    PostLoginRedirectPage?: MixedContentContext;
    RegistrationPage?: MixedContentContext;
    ResetPasswordPage?: MixedContentContext;
    RememberMe?: boolean;
    ExternalProviders?: string[];
    SfViewName?: string;
    MembershipProviderName?: string;
    Header?: string;
    EmailLabel?: string;
    PasswordLabel?: string;
    SubmitButtonLabel?: string;
    ErrorMessage?: string;
    RememberMeLabel?: string;
    ForgottenPasswordLinkLabel?: string;
    NotRegisteredLabel?: string;
    RegisterLinkText?: string;
    ExternalProvidersHeader?: string;
    ValidationRequiredMessage?: string;
    ValidationInvalidEmailMessage?: string;
}
