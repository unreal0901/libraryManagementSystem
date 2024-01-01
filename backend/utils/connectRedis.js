const { createClient } = require("redis");
const config = require("config");
const redisUrl = `redis://${config.get("redisName")}:${config.get(
  "redisPass"
)}@redis-17596.c15.us-east-1-2.ec2.cloud.redislabs.com:17596`;

const redisClient = createClient({
  password: config.get("redisPass"),
  socket: {
    host: "redis-11630.c321.us-east-1-2.ec2.cloud.redislabs.com",
    port: 11630,
  },
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected...");
  } catch (err) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on("error", (err) => console.log(err));

module.exports = redisClient;
