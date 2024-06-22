import cron from 'node-cron';
import TokenService from "../modules/services/token.service";

const tokenService = new TokenService();

cron.schedule('0 0 * * *', async () => {
    try {
        await tokenService.removeExpiredTokens();
    } catch (error) {
        console.error('Error while removing expired tokens:', error);
    }
});
