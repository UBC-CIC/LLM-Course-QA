class Constants {
    static LOGO_FILE_PATH = process.env.PUBLIC_URL +'/assets/images/xl-dispatch-logo.png';
    static PROFILE_PLACEHOLDER = process.env.PUBLIC_URL +'/assets/images/xl-dispatch-logo-square.png';
    static BG_FILE_PATH = process.env.PUBLIC_URL + '/assets/images/xl-dispatch-bg.png';
    static API_BASE_URL = 'https://example.com/api';
    static MAX_UPLOAD_SIZE_MB = 10;
    static DEFAULT_PAGE_SIZE = 20;
    static ERROR_MESSAGES = {
        INVALID_EMAIL: 'Please enter a valid email address',
        PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
        SERVER_ERROR: 'Oops! Something went wrong. Please try again later.',
    };
}

export default Constants;