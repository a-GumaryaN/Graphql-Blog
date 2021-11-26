const crypto = require('crypto');

export const hasher =
    (algo: string, input: string, charStandard: string, hashFormat: string) => {
        const hash = crypto.createHash(algo);
        hash.update(input, charStandard);
        return hash.digest(hashFormat);
    }