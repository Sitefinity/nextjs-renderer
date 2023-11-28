import { ChangePasswordLabels } from './ChangePasswordLabels';

export interface ChangePasswordViewModel {
    ChangePasswordHandlerPath: string;
    Attributes: any[] | undefined;
    Labels: ChangePasswordLabels;
    VisibilityClasses: {[key: number]: string;};
    InvalidClass: string;
    PostPasswordChangeAction?: string;
    ExternalProviderName?: string;
    RedirectUrl?: string;
    PostPasswordChangeMessage?: string;
}
