import * as jwt from 'jsonwebtoken';

export const auth = (token, secretKey): object => {
    if (!token) return { error: 'access denied...' };
    try {
        // const nowDate = new Date().getTime();
        const { exp }: any = jwt.decode(token);

        if (Date.now() > exp * 1000) return { error: 'token is expired...' };

        const userVerified = jwt.verify(token, secretKey);

        const decodedToken: any = jwt.decode(token);

        if (userVerified) return { username: decodedToken.username };

        return { error: 'invalid token...' };


    } catch (err) {
        return { error: 'invalid token...' };
    }
}