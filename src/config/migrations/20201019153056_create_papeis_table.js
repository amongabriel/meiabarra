
exports.up = function (knex) {
    return knex.schema.createTable('papeis', function (table) {
        table.string('uuid').primary();
        table.string('lista').notNullable();
        table.string('operacao').notNullable();
        table.date('data').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('papeis');

};
