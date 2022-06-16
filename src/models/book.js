module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
        },
        ISBN: {
            type: DataTypes.STRING,
        },
        // title: DataTypes.STRING,
        // author: DataTypes.STRING,
        // genre: DataTypes.STRING,
        // ISBN: DataTypes.STRING,
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
}