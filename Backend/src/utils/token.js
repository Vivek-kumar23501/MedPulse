const jwt = require('jsonwebtoken');
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

class TokenManager {
  // Generate access token
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    });
  }

  // Generate refresh token with jti (JWT ID)
  static generateRefreshToken(payload) {
    const jti = require('crypto').randomBytes(16).toString('hex');
    const token = jwt.sign(
      { ...payload, jti },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    return { token, jti };
  }

  // Store refresh token in Redis
  static async storeRefreshToken(userId, jti) {
    await redisClient.setEx(
      `refresh_token:${jti}`,
      7 * 24 * 60 * 60, // 7 days in seconds
      userId.toString()
    );
  }

  // Verify access token
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  // Verify refresh token and check Redis
  static async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      
      // Check if token exists in Redis
      const storedUserId = await redisClient.get(`refresh_token:${decoded.jti}`);
      if (!storedUserId) {
        throw new Error('Refresh token not found');
      }

      return decoded;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Revoke refresh token (used during logout and token rotation)
  static async revokeRefreshToken(jti) {
    await redisClient.del(`refresh_token:${jti}`);
  }

  // Get user ID from refresh token jti
  static async getUserIdFromRefreshToken(jti) {
    return await redisClient.get(`refresh_token:${jti}`);
  }
}

module.exports = TokenManager;