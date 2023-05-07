import db from "./pg-connection";

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