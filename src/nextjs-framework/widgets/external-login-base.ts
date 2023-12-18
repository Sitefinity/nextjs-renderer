export class ExternalLoginBase {
    public static ErrorQueryKey = 'loginerror';
    public static ShowSuccessMessageQueryKey = 'showSuccessMessage';
    public static ExternalLoginHandlerPath?: string = '/sitefinity/external-login-handler';
    public static ShowSuccessMessageQueryParameter?: boolean = false;
    public static isError = (context: any) => {
        if (context && context.searchParams[this.ErrorQueryKey]) {
            return context.searchParams[this.ErrorQueryKey].toLowerCase() === 'true';
        }

        return false;
    };

    public static ShowSuccessMessage = (context: any) => {
        if (context && context.searchParams[this.ShowSuccessMessageQueryKey]) {
            return context.searchParams[this.ShowSuccessMessageQueryKey].toLowerCase() === 'true';
        }

        return false;
    };

    public static GetDefaultReturnUrl(context: any, args: {
        isError?: boolean,
        errorRedirectUrl?: string,
        redirectUrl?: string,
        shouldEncode?: boolean
    } = { isError: false, shouldEncode: false}) {

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
        } else if (this.ShowSuccessMessageQueryParameter) {
            searchParams[this.ShowSuccessMessageQueryKey] = 'True';
        }

        const queryString =  new URLSearchParams(searchParams);

        let result = `${context.layout?.MetaInfo.CanonicalUrl}?${queryString}`;
        if (args.shouldEncode) {
            result = encodeURIComponent(result).toLowerCase();
        }

        return result;
    }

    public static GetExternalLoginPath(context: any, provider: any, externalLoginHandlerPath?: string) {
        const expandPath = externalLoginHandlerPath || this.ExternalLoginHandlerPath;
        const returnUrl = this.GetDefaultReturnUrl(context, {isError:false, shouldEncode:true});
        const errorUrl = this.GetDefaultReturnUrl(context, {isError:true, shouldEncode:true});

        return `${expandPath}?provider=${provider}&returnUrl=${returnUrl}&errorUrl=${errorUrl}`;
    }

    public static GetExternalLoginButtonCssClass(provider: string) {
        if (!provider) {
            return '';
        }
        return '-sf-' + provider.toLowerCase() + '-button';
    }
}
