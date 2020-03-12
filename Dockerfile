FROM node:13.8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
# Should enable --production
RUN npm install 
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 5050
CMD [ "npm", "start" ]