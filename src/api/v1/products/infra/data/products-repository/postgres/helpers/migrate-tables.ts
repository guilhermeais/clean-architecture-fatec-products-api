import db from './pg-connection'

export const migrateTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id uuid PRIMARY KEY,
      attributes jsonb DEFAULT '[]'::jsonb,
      brand varchar(255),
      cost_value numeric(10,2),
      ean varchar(255),
      sell_value numeric(10,2),
      title varchar(255)
    );

    CREATE TABLE IF NOT EXISTS categories (
      id uuid PRIMARY KEY,
      name varchar(255)
    );

    CREATE TABLE IF NOT EXISTS products_categories (
      product_id uuid REFERENCES products(id),
      category_id uuid REFERENCES categories(id)
    );
  `)
}

export const dropTables = async () => {
  await db.query('DROP TABLE products_categories')
  await db.query('DROP TABLE products')
  await db.query('DROP TABLE categories')
}

if (process.argv.indexOf('up') > -1) {
  console.info('Migrating tables...')
  migrateTables()
    .then(() => {
      console.info('Tables migrated!')
      process.exit(0)
    })
    .catch(error => {
      console.error('Error migrating tables', error)
      process.exit(1)
    })
}
if (process.argv.indexOf('down') > -1) {
  console.info('Dropping tables...')
  dropTables()
    .then(() => {
      console.info('Tables dropped!')
      process.exit(0)
    })
    .catch(error => {
      console.error('Error dropping tables', error)
      process.exit(1)
    })
}
