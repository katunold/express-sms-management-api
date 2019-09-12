# base image
FROM node:12.2.0
LABEL AUTHOR="Arnold Katumba <arnold.katumba@andela.com>"

# set working directory
WORKDIR /express-sms-management-api

# add app
COPY . /express-sms-management-api

# install and cache app dependencies
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]
