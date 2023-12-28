# get the base node image
FROM node:18 as builder

# set the working dir for container
WORKDIR /lephong612/student-fita-ui

# copy the json file first
COPY ./package.json /lephong612/student-fita-ui

# install npm dependencies
RUN npm install

# copy other project files
COPY . .
EXPOSE 3000

# build the folder
CMD [ "npm", "run", "start" ]
