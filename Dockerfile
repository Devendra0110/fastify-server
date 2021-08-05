FROM node:10.20.1-alpine3.11

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies
COPY . .

#Setup imagemagic
RUN apk add --no-cache file
RUN apk --update add imagemagick

# Install app dependencies
RUN npm install
RUN npm install pm2 -g
RUN npm run build:prod

# Remove unrequired directories
RUN rm -rf ./src

EXPOSE 3000

CMD [ "pm2-runtime", "ecosystem.config.js", "--env", "production"]
