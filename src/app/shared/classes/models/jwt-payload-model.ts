export interface JwtPayloadModel {
    iss: string;
    aud: string;
    exp: number;
    nbf: number;
    client_id: string;
    scope: string[];
    sub: string;
    auth_time: number;
    idp: string;
    preferred_username: string;
    email: string;
    email_verified: string;
    phone_number: string;
    phone_number_verified: string;
    'powertrack_enterprise.role': string;
    given_name: string;
    family_name: string;
    application: string;
    amr: string[];
}
