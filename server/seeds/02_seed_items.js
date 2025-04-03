/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()


  await knex('items').insert([
    {
      user_id: 1,
      item_name: 'Flashlight',
      description: 'A high-powered LED flashlight for nighttime missions.',
      quantity: 3
    },
    {
      user_id: 1,
      item_name: 'Compass',
      description: 'A reliable compass with glow-in-the-dark markings.',
      quantity: 1
    },
    {
      user_id: 2,
      item_name: 'Night Vision Goggles',
      description: 'Military-grade NVGs for stealth ops.',
      quantity: 2
    }
  ]);
};
