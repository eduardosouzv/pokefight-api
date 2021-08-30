FROM node:14.16.1-buster-slim
WORKDIR /home/app
COPY . .
RUN npm install
EXPOSE 3333
CMD ["yarn","dev"]

