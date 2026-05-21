# Spring Boot + dummyoauth

OAuth2 login client registration using `issuer-uri` from your dummyoauth Integration panel.

## Redirect URI

`http://localhost:3011/login/oauth2/code/dummyoauth`

## Run

```bash
cd examples/spring
export OAUTH_ISSUER=http://localhost:3000/p/demo
export OAUTH_CLIENT_ID=demo
export OAUTH_CLIENT_SECRET=demo
./mvnw spring-boot:run
```

Or with Maven installed: `mvn spring-boot:run`

Guide: `/guides/integrate-spring`

Development and test only.
