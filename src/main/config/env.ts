export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/url-shortener',
  port: process.env.PORT || 5050
}
