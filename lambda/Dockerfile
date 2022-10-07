FROM amazon/aws-lambda-nodejs:latest

ARG FUNCTION_DIR="/var/task"
COPY app.js ${FUNCTION_DIR}
# CMD [ "app.handler" ]
ENTRYPOINT [ "app.handler" ]