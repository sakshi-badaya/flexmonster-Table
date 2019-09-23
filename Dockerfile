 # stage 1
FROM node as node
WORKDIR /app
COPY . .
RUN npm i

RUN npm run ng build

# RUN npm run ng build --configuration=$NG_ENV

# ENTRYPOINT [ "ng","serve"]  
# stage 2
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/ /usr/share/nginx/html
# CMD [ "npm", "start" ]
