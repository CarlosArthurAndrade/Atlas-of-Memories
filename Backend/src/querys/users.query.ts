export const QUERY = {
    SELECT_USER: 'SELECT * FROM Users WHERE email = ?',
    SELECT_USER_ID: 'SELECT * FROM Users WHERE id = ?',
    CREATE_USER: 'INSERT INTO Users (username, email, password) VALUES(?, ?, ?)',
    SELECT_USER_EMAIL: 'SELECT * FROM Users WHERE email = ?',
    CHANGE_USER_PASSWORD: 'UPDATE Users SET password = ? WHERE id = ?',
    CHANGE_USER_USERNAME: 'UPDATE Users SET username = ? WHERE id = ?',
    SAVE_RESET_TOKEN: 'INSERT INTO PasswordResetTokens (userId, tokenHash, expiresAt) VALUES(?, ?, ?)',
    SELECT_TOKENHASH: 'SELECT * FROM PasswordResetTokens WHERE tokenHash = ?',
    DELETE_TOKENHASH: 'DELETE * FROM PasswordResetTokens WHERE id = ?'
}