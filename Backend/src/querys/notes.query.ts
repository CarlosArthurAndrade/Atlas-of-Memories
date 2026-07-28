export const QUERY = {
    SELECT_NOTES: 'SELECT * FROM Notes WHERE authorId = ? ORDER BY writingDate',
    SELECT_NOTE_BY_ID: 'SELECT * FROM Notes Where id = ?',
    CREATE_NOTE: 'INSERT INTO Notes (title, messageText, authorId, writingDate) VALUES(?, ?, ?, ?)',
    UPADTE_NOTE: 'UPDATE Notes SET title = ?, messageText = ?, writingDate = ? WHERE id = ?',
    FAVORITE_NOTE: 'UPDATE Notes SET favorite = NOT favorite WHERE id = ?',
    DELETE_NOTE: 'DELETE FROM Notes WHERE id = ?'
}