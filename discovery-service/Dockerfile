FROM openjdk:17-slim
VOLUME /tmp
COPY target/*.jar  app.jar
RUN apt-get update && apt-get install -y curl

ENTRYPOINT ["java","-jar","app.jar"]