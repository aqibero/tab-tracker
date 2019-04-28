module.exports = {
    port: process.env.PORT || 3306,
    db: {
      database: process.env.DB_NAME || 'tabtracker',
      user: process.env._DB_USER || 'tabtracker',
      password: process.env.DB_PASS || '123456',
      options: {
        dialect: process.env.DIALECT || 'mysql',
        host: process.env.HOST || 'localhost'
        // storage: './tabtracker.sqlite'
      }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
