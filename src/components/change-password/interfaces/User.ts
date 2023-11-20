export interface Claim {
    Type: string;
    Value: string;
    ValueType: string;
    Issuer: string;
    OriginalIssuer: string;
}

export interface User {
    Roles: string[];
    AuthenticationProtocol: string;
    Username: string;
    Email: string;
    Claims: Claim[],
    AuthenticationUrl: string;
    ExternalProviderName: string;
    IsAuthenticated: boolean;
    Id: string | null;
    FirstName: string | null;
    LastName: string | null;
    Avatar: string | null;
    Preferences: {
      [key: string]: string;
    };
    IsProfilePublic: boolean;
}
