export class ExternalLoginBase {
    static ErrorQueryKey = 'loginerror';
    static ShowSuccessMessageQueryKey = 'showSuccessMessage';
    static ExternalLoginHandlerPath = '/sitefinity/external-login-handler';
    static ShowSuccessMessageQueryParameter = false;
    static isError = (context) => {
        if (context && context.searchParams[this.ErrorQueryKey]) {
            return context.searchParams[this.ErrorQueryKey].toLowerCase() === 'true';
        }
        return false;
    };
    static ShowSuccessMessage = (context) => {
        if (context && context.searchParams[this.ShowSuccessMessageQueryKey]) {
            return context.searchParams[this.ShowSuccessMessageQueryKey].toLowerCase() === 'true';
        }
        return false;
    };
    static GetDefaultReturnUrl(context, args = { isError: false, shouldEncode: false }) {
        if (args.errorRedirectUrl && args.isError) {
            return args.errorRedirectUrl;
        }
        if (args.redirectUrl && !args.isError) {
            return args.redirectUrl;
        }
        const searchParams = {
            ...context.searchParams
        };
        delete searchParams[this.ErrorQueryKey];
        delete searchParams[this.ShowSuccessMessageQueryKey];
        if (args.isError) {
            searchParams[this.ErrorQueryKey] = args.isError ? 'True' : 'False';
        }
        else if (this.ShowSuccessMessageQueryParameter) {
            searchParams[this.ShowSuccessMessageQueryKey] = 'True';
        }
        const queryString = new URLSearchParams(searchParams);
        let result = `${context.pageNode.MetaInfo.CanonicalUrl}?${queryString}`;
        if (args.shouldEncode) {
            result = encodeURIComponent(result).toLowerCase();
        }
        return result;
    }
    static GetExternalLoginPath(context, provider, externalLoginHandlerPath) {
        const expandPath = externalLoginHandlerPath || this.ExternalLoginHandlerPath;
        const returnUrl = this.GetDefaultReturnUrl(context, { isError: false, shouldEncode: true });
        const errorUrl = this.GetDefaultReturnUrl(context, { isError: true, shouldEncode: true });
        return `${expandPath}?provider=${provider}&returnUrl=${returnUrl}&errorUrl=${errorUrl}`;
    }
    static GetExternalLoginButtonCssClass(provider) {
        if (!provider) {
            return '';
        }
        return '-sf-' + provider.toLowerCase() + '-button';
    }
}
