FROM node:18.14.2
 
WORKDIR /user/src/bankuish
 
COPY . .
 
RUN npm i
 
RUN npm run build
 
USER node
 
CMD ["node", "dist/main.js"]