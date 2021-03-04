import { UserManager, WebStorageStateStore, User } from 'oidc-client';

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const STS_DOMAIN: string = 'https://localhost:8001';

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: STS_DOMAIN,
            client_id: 'crazypriceclient',
            redirect_uri: 'https://localhost:44357/callback.html',
            automaticSilentRenew: true,
            silent_redirect_uri: 'https://localhost:44357/silent-renew.html',
            response_type: 'code',
            scope: 'openid profile role crazy_price_api1',
            post_logout_redirect_uri: 'https://localhost:44357',
            filterProtocolClaims: true,
        };

        this.userManager = new UserManager(settings);
    }

    public getUser(): Promise<User | null> {
        console.log('getUser')
        return this.userManager.getUser()
    }

    public signinPopup(): Promise<User | null> {
        return this.userManager.signinPopup();
    }

    public login(): Promise<void> {
        console.log('login')
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        console.log('logout')
        return this.userManager.signoutRedirect();
    }

    public getAccessToken(): Promise<string> {
        console.log('getToken')
        return this.userManager.getUser().then((data: any) => {
            return data.access_token;
        });
    }
}
