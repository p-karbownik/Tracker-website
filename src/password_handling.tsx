// adapted (added types) from https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/

import { randomBytes, createHmac } from "crypto"

export type PasswordData = {
    salt: string;
    passwordHash: string;
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
 var genRandomString = function(length : number) : string {
    return randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password : string, salt : string) : PasswordData {
    var hash = createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

export function saltHashPassword(userpassword : string) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    
    return passwordData;
}