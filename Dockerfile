# take default image of node i.e  node 8.x
FROM node:8.10.0

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock /app/

# # --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/

# expose port 4040
EXPOSE 8080

# cmd to start service
# CMD [ "npm", "run", "start:prod" ]
CMD npm run start  >> ./logs/output.$(date +%Y%m%d).txt 2>&1
