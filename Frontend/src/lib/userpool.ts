// ref: https://medium.com/@adi2308/aws-cognito-with-reactjs-for-authentication-c8916b873ccb
import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: import.meta.env.VITE_USER_POOL_ID,
    ClientId: import.meta.env.VITE_CLIENT_ID
};

export default new CognitoUserPool(poolData);