# The Sentinel

Sentinel is an browser based exam portal, which is built using **MERN** stack. User interface is built using **reactjs** and **redux** as state management system. Back-end API's are done in **nodejs** and **mongodb** as database.

Sentinel will have the capability of authoring question items and configuring testlet of a test. It will have a built-in dashboard which provide information on various activities going on with the application for admin users. Candidates will have separate login area, where they could take test and submit their responses.

![Screen](./screenshots/logo.png)

### Technology stack

![Screen](./screenshots/mern-stack.png)

### How to use

Application uses different npm packages on both client and server. To run this application, packages need to be installed by navigating to **client**, **server** and **app** folders using the command

- cd <-folder-name->
- npm install

*Note - To run this command local machine should have **nodejs** installed.*

Each folder **client**, **server** and **app** has its own packages.json file, which has command to run application. We can run the application by navigating to corresponding folder and run command

- npm start

To run both client and server from same command prompt, we can run **npm start** from app folder. We used a package called concurrently for achieving this.

### Screen mockups

#### Dashboard

![Screen](./screenshots/dashboard.png)
