FROM node:14 as base
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install && \
    npm run build

FROM base as test
ENTRYPOINT [ "npm", "test" ]

FROM node:14 as runtime
WORKDIR /home/node/app
COPY --from=base /home/node/app/build/src ./build/src
COPY --from=base /home/node/app/package.json /home/node/app/package-lock.json ./
RUN npm install --production
USER node
EXPOSE 8080
CMD [ "npm", "start" ]
