import { ChangePasswordLabels } from './ChangePasswordLabels';

export interface ChangePasswordViewModel {
    ChangePasswordHandlerPath: string;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    Labels: ChangePasswordLabels;
    VisibilityClasses: {[key: number]: string;};
    InvalidClass: string;
    PostPasswordChangeAction?: string;
    ExternalProviderName?: string;
    RedirectUrl?: string;
    PostPasswordChangeMessage?: string;
}
