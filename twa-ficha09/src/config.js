export const config = {
    port: Number(process.env.PORT) || 3000,
    mongpUri: process.env.MONGO_URI || 'mongodb://localhost:27017/twa-ficha09',
    env: process.env.NODE_ENV || 'development',
}