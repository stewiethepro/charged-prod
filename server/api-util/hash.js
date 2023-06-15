const crypto = require('crypto');

const secretKey = 'Ab0rijT9eRoEQAcO9ZxZ3f-SW2ILF6hrTJL0P9so'; // secret key (keep safe!) 
exports.getHash = (userId) => {
    
    const userIdentifier = current_user.id.toString(); // user's id
    const hash = crypto.createHmac('sha256', secretKey).update(userIdentifier).digest('hex');
    
    return hash;
};