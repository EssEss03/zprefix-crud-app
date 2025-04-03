/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    {
      first_name: 'Jasmine',
      last_name: 'Brown',
      username: 'ecoder',
      password: hashedPassword
    },
    {
      first_name: 'Clay',
      last_name: 'Hamilton',
      username: 'cham',
      password: await bcrypt.hash('secure456', 10)
    }
  ]);
};
