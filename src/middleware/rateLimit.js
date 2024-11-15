const rateLimit = require('express-rate-limit');

// for messages
const msglimiter = rateLimit({
    windowMs: 1000,  // 1 second window
    max: 5,          // Allow only 5 requests per second
    message: 'Too many msg requests, please try again later.', // Custom message when rate limit is exceeded
    statusCode: 429,  // Status code for rate limit exceeded
    keyGenerator: function (req) {
        return req.ip;  // Rate limit based on user IP (or you can use `req.user.id` for logged-in users)
    },
    handler: function (req, res) {
    // Custom message on exceeding the limit
    res.status(this.statusCode).send(this.message);
    console.log(`Rate limit exceeded for ${req.ip}`);
  }
  });


  // for lobby create, delete, user delete, etc.
  const standardlimiter = rateLimit({
    windowMs: 1 * 60 * 1000,  // 5 minute window
    max: 5,          // Allow only 5 requests per second
    message: 'Too many standard requests, please try again later.', // Custom message when rate limit is exceeded
    statusCode: 429,  // Status code for rate limit exceeded
    keyGenerator: function (req) {
        return req.ip;  // Rate limit based on user IP (or you can use `req.user.id` for logged-in users)
    },
    handler: function (req, res) {
    // Custom message on exceeding the limit
    res.status(this.statusCode).send(this.message);
    console.log(`Rate limit exceeded for ${req.ip}`);
  }
  });


module.exports = { msglimiter, standardlimiter };


  