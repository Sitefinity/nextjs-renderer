import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { PostLoginAction } from './interfaces/PostLoginAction';
import { StylingConfig } from '../styling/styling-config';
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId';

const isError = (context: any) => {
    if (context.searchParams['loginerror']) {
        return context.searchParams['loginerror'].toLowerCase() === 'true';
    }

    return false;
};

export async function LoginForm(props: WidgetContext<LoginFormEntity>) {
    const entity = {
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
    // console.log('context', context);
   // console.log('entity', entity);
    const dataAttributes = htmlAttributes(props);

    const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    // dataAttributes['data-sfemptyicontext'] = 'Create call to action';
    // dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: any = {
        LoginHandlerPath: '/sitefinity/login-handler',
        ExternalLoginHandlerPath: '/sitefinity/external-login-handler',
        RememberMe: entity.RememberMe,
        MembershipProviderName: entity.MembershipProviderName,
        Attributes: entity.Attributes,
        Labels: {}
    };

if (entity.ExternalProviders && entity.ExternalProviders.length){
    // var externalProviders = await this.restService.ExecuteUnboundAction<ODataWrapper<IEnumerable<ExternalProviderItemDto>>>(new BoundActionArgs()
    // {
    //     Name = "Default.GetExternalProviders",
    // });
    // viewModel.ExternalProviders = externalProviders.Value.Where(p => entity.ExternalProviders.Contains(p.Name));
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

// if (entity.PostLoginAction == PostLoginAction.RedirectToPage
//    && entity.PostLoginRedirectPage?.Content?[0]?.Variations?.length !== 0){
    // var pageNodes = await this.restService.GetItems<PageNodeDto>(entity.PostLoginRedirectPage, new GetAllArgs() { Fields = new[] { nameof(PageNodeDto.ViewUrl) } });
    // var items = pageNodes.Items;
    // if (items.Count == 1)
    //     viewModel.RedirectUrl = items[0].ViewUrl;
//}

//if (entity.RegistrationPage?.Content?[0]?.Variations?.Length !== 0){
    // var pageNodes = await this.restService.GetItems<PageNodeDto>(entity.RegistrationPage, new GetAllArgs() { Fields = new[] { nameof(PageNodeDto.ViewUrl) } });
    // var items = pageNodes.Items;
    // if (items.Count == 1)
    //     viewModel.RegistrationLink = items[0].ViewUrl;
//}

//if (entity.ResetPasswordPage?.Content?[0]?.Variations?.Length !== 0){
    // var pageNodes = await this.restService.GetItems<PageNodeDto>(entity.ResetPasswordPage, new GetAllArgs() { Fields = new[] { nameof(PageNodeDto.ViewUrl) } });
    // var items = pageNodes.Items;
    // if (items.Count == 1)
    //     viewModel.ForgottenPasswordLink = items[0].ViewUrl;
//}

// this.httpContextAccessor.HttpContext.AddVaryByQueryParams(ExternalLoginBase.ErrorQueryKey);
// if (viewModel.IsError(this.httpContextAccessor.HttpContext))
// {
//     this.httpContextAccessor.HttpContext.DisableCache();
// }
const lbls = viewModel.Labels;
const returnUrl = '';// viewModel.RedirectUrl ?? viewModel.GetDefaultReturnUrl(context, false, false);
const returnErrorUrl = ''; //viewModel.GetDefaultReturnUrl(context, true, false);
const usernameInputId = getUniqueId('sf-username-');
const passwordInputId = getUniqueId('sf-password-');
const passResetColumnSize = viewModel.RememberMe ? 'col-md-6 text-end' : 'col-12';
    return (
      <div
        {...dataAttributes}
      //  {...wrapperCustomAttributes}
        >
        <div data-sf-role="form-container">
          <h2 className="mb-3">{lbls.Header}</h2>
          <div id="errorContainer"
            className={`alert alert-danger my-3 ${isError(context) ? 'd-block' : 'd-none'}`}
            role="alert" aria-live="assertive" data-sf-role="error-message-container">{lbls.ErrorMessage}</div>
          <form action="viewModel.LoginHandlerPath" method="post" role="form" noValidate={true}>
            <div className="mb-3">
              <label htmlFor={usernameInputId} className="form-label">{lbls.EmailLabel}</label>
              <input type="email" className="form-control" id={usernameInputId} name="username" data-sf-role="required" />
            </div>
            <div className="mb-3">
              <label htmlFor={passwordInputId} className="form-label">{lbls.PasswordLabel}</label>
              <input type="password" className="form-control" id={passwordInputId} name="password" data-sf-role="required"
                autoComplete="on" />
            </div>
            {(viewModel.RememberMe || viewModel.ForgottenPasswordLink) &&
            <div className="row mb-3">
              {viewModel.RememberMe &&
              <div className="checkbox col-md-6 m-0">
                <label>
                  {/* @Html.CheckBoxFor(x => x.RememberMe)
                                @Html.LabelFor(x => x.RememberMe, lbls.RememberMeLabel) */}
                </label>
              </div>
                    }

              {viewModel.ForgottenPasswordLink &&

              <div className={passResetColumnSize}>
                <a href={viewModel.ForgottenPasswordLink}
                  className="text-decoration-none">{lbls.ForgottenPasswordLinkLabel}</a>
              </div>
                    }
            </div>
            }

            <input type="hidden" name="RedirectUrl" value={returnUrl} />
            <input type="hidden" name="ErrorRedirectUrl" value={returnErrorUrl} />
            <input type="hidden" name="MembershipProviderName" value={viewModel.MembershipProviderName} />
            <input type="hidden" value="" name="sf_antiforgery" />

            <input className="btn btn-primary w-100" type="submit" value={lbls.SubmitButtonLabel} />
          </form>

          <input type="hidden" name="ValidationInvalidEmailMessage" value={lbls.ValidationInvalidEmailMessage} />
          <input type="hidden" name="ValidationRequiredMessage" value={lbls.ValidationRequiredMessage} />
        </div>

        {viewModel.RegistrationLink &&
        <div className="row mt-3">
          <div className="col-md-6">{lbls.NotRegisteredLabel}</div>
          <div className="col-md-6 text-end"><a href={viewModel.RegistrationLink}
            className="text-decoration-none">{lbls.RegisterLinkText}</a></div>
        </div>
    }

        {viewModel.ExternalProviders && viewModel.ExternalProviders.length &&

        [<h3 key={100} className="mt-3">{lbls.ExternalProvidersHeader}</h3>,
            viewModel.ExternalProviders.map((provider: any, idx: number) => {
                const providerClass = viewModel.GetExternalLoginButtonCssClass(provider.Name);
                const providerHref = viewModel.GetExternalLoginPath(context, provider.Name);
                return (
                  <a key={idx} data-sf-test="extPrv"
                    className={classNames('btn border fs-5 w-100 mt-2',providerClass)}
                    href={providerHref}>{provider.Title}</a>
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
    //  [Content(Type = KnownContentTypes.Pages, AllowMultipleItemsSelection = false)]
    PostLoginRedirectPage?: any; // MixedContentContext
    //  [Content(Type = KnownContentTypes.Pages, AllowMultipleItemsSelection = false)]
    RegistrationPage?: any;
  //  [Content(Type = KnownContentTypes.Pages, AllowMultipleItemsSelection = false)]
    ResetPasswordPage?: any;
    RememberMe?: boolean;
    ExternalProviders?: string[];
    SfViewName?: string;
    MembershipProviderName?: string;
    Header?: string; // 'Login'
    EmailLabel?: string; // 'Email / Username'
    PasswordLabel?: string; // 'Password'
    SubmitButtonLabel?: string; // 'Log in'
    ErrorMessage?: string; // 'Incorrect credentials.'
    RememberMeLabel?: string; // 'Remember me'
    ForgottenPasswordLinkLabel?: string; // 'Forgotten password'
    NotRegisteredLabel?: string; // 'Not registered yet?'
    RegisterLinkText?: string; // 'Register now'
    ExternalProvidersHeader?: string; // 'or use account in...'
    ValidationRequiredMessage?: string; // 'All fields are required.'
    ValidationInvalidEmailMessage?: string; // 'Invalid email format.'
    // private const string SelectPages = "Select pages";
    // private const string LoginWithExternalProviders = "Login with external providers";
}
