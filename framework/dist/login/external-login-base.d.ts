export declare class ExternalLoginBase {
    static ErrorQueryKey: string;
    static ShowSuccessMessageQueryKey: string;
    static ExternalLoginHandlerPath?: string;
    static ShowSuccessMessageQueryParameter?: boolean;
    static isError: (context: any) => boolean;
    static ShowSuccessMessage: (context: any) => boolean;
    static GetDefaultReturnUrl(context: any, args?: {
        isError?: boolean;
        errorRedirectUrl?: string;
        redirectUrl?: string;
        shouldEncode?: boolean;
    }): string;
    static GetExternalLoginPath(context: any, provider: any, externalLoginHandlerPath?: string): string;
    static GetExternalLoginButtonCssClass(provider: string): string;
}
