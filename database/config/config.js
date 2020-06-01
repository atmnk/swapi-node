module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'dev-db.sqlite3'
  },
  test: {
    dialect: 'sqlite',
    storage: 'test-db.sqlite3'
  },
  production: {
    dialect: 'sqlite',
    storage: 'prod-db.sqlite3'
  }
};