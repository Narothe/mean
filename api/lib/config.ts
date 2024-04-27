export let config: { JwtSecret: string; port: string | number; supportedPostCount: number; databaseUrl: string; tokenExpiration: number };
config = {
    port: process.env.PORT || 3100,
    supportedPostCount: 15,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://twwai:KTp5wYwutrLHPLT@cluster0.ooees.mongodb.net/IoT?retryWrites=true&w=majority',
    JwtSecret: 'secret',
    tokenExpiration: 3600 * 1000
};
