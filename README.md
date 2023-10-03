# quiz-webapp

### Running the app
```
# Dev mode:
npm i
npm run dev
# Production mode
npm i 
npm run build
npm run start
```

### Running the app using docker 
```
docker build -t quiz-web-app ./
docker run -p 3000:3000 quiz-web-app
``` 

### Features
- A generic Error Boundary has been defined. to capture and log the errors.

### Assumptions
- Each new quiz game will have user id associated with each game. (Randomly generated).
- User id will be sent in the params of each request to link the quiz session.

### Folder structure
- /pages 
    - /api -> Mock APIs required for the app.
    - /[route-name] -> Individual route for the screen.
- /src 
    - /api -> Endpoints details to be used in the app.
    - /component -> Frontend components for the pages.
    - /context -> A global context for the app.
    - /helpers -> Contains functions for different utilities.
    - /mocks -> Mock data for the APIs.
    - /store -> Global store the manage the state of the application