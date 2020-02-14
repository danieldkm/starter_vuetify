
const crypto = require('crypto');
module.exports = {
    cipher(pass) {
        return new Promise((resolve, reject) => {
            try {
                const algorithm = 'aes-192-cbc';
                const password = 'dSgVkYp2s5v8ykBiEcHpMbQeThWmZq4tTOPKIDSGARDENPWD'.substring(0,24);
                // Key length is dependent on the algorithm. In this case for aes192, it is
                // 24 bytes (192 bits).
                // Use async `crypto.scrypt()` instead.
                const key = crypto.scryptSync(password, 'salt', 24);
                // Use `crypto.randomBytes()` to generate a random iv instead of the static iv
                // shown here.
                const iv = Buffer.alloc(16, 0); // Initialization vector.

                const cipher = crypto.createCipheriv(algorithm, key, iv);

                let encrypted = '';
                cipher.on('readable', () => {
                let chunk;
                while (null !== (chunk = cipher.read())) {
                    encrypted += chunk.toString('hex');
                }
                });
                cipher.on('end', () => {
                    resolve(encrypted)
                // Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
                });

                cipher.write(pass);
                cipher.end();
            } catch (error) {
                reject(error)
            }
        })
    },

    decipher(pass) {
        return new Promise((resolve, reject) => {
            try {
                const algorithm = 'aes-192-cbc';
                const password = process.env.SECRET.substring(0,24);
                // Key length is dependent on the algorithm. In this case for aes192, it is
                // 24 bytes (192 bits).
                // Use the async `crypto.scrypt()` instead.
                const key = crypto.scryptSync(password, 'salt', 24);
                // The IV is usually passed along with the ciphertext.
                const iv = Buffer.alloc(16, 0); // Initialization vector.

                const decipher = crypto.createDecipheriv(algorithm, key, iv);

                let decrypted = '';
                decipher.on('readable', () => {
                // eslint-disable-next-line no-undef
                while (null !== (chunk = decipher.read())) {
                    // eslint-disable-next-line no-undef
                    decrypted += chunk.toString('utf8');
                }
                });
                decipher.on('end', () => {
                    resolve(decrypted)
                // Prints: some clear text data
                });

                // Encrypted with same algorithm, key and iv.
                const encrypted = pass
                // 'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
                decipher.write(encrypted, 'hex');
                decipher.end();
            } catch (error) {
                reject(error)
            }
        })
    }
}