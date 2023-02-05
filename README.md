# Frontend to the Internet application for money transfer and account opening

## Install and run the project
1. To run this project, you will need nodejs and npm.

2. Install the 'CORS Unblock' extension in your browser and run it.
In this case, you need to enable, when you click on the extension with the right mouse button:

  * Enable Access-Control-Allow-Origin,

  * Enable Access-Control-Allow-Credentials,

  * Enable Access-Control-[Allow/Expose]-Headers.

3. Clone this repository to your disk. Then run `npm init` to install and `npm run build'. We run index.html from the /dist folder using a web server. If VSCode is installed, then you can use LiveServer.

4. You also need to start the data server. You need to go to the 'js-advanced-diploma' folder. Run `npm init` to install and `npm start' to start the server. By default, the server listens on port 3000 of localhost.

## Run tests
1. To run unit tests, go to the '__test__' folder and run 'npm test'.
2. To run e2e tests, you need to go to the 'Frontend' folder and run the 'npx cypress open' command and run the 'coin-app.spec.js' script, after moving the 'coin-app.spec.js' file to the folder 'cypress' - 'integration'.

# Application example

![first](https://user-images.githubusercontent.com/91899278/216834204-962ec965-964a-45a4-9919-a0e190b7d45c.gif)
![second](https://user-images.githubusercontent.com/91899278/216834243-bfd7fd63-bda0-4b90-9b70-c590f03bafd7.gif)
![third](https://user-images.githubusercontent.com/91899278/216834254-f3166aff-4e55-4d35-a875-60626c916f04.gif)
![last](https://user-images.githubusercontent.com/91899278/216834255-b41bea9b-0f4e-4a42-b3ca-8ed78bf313e4.gif)

