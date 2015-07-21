
#install software
npm install -g grunt grunt-cli bower yo generator-angular-fullstack

#Create your Application
yo angular-fullstack YOUR_APP_NAME
# When prompted, answer "yes" to every available option except Sass & Compass support.

yo angular-fullstack:openshift OPENSHIFT_APP_NAME

#Develope
grunt serve
#but you need to modify Gruntfile.js
sed -i 's/localhost/0.0.0.0/' Gruntfile.js
#and modify the development file:
nano server/config/environment/development.js
#add:
ip: '0.0.0.0',
#or
ip: process.env.IP || '0.0.0.0',

#Deploy

grunt build

grunt buildcontrol:openshift

#more instructions

https://developers.openshift.com/en/node-js-example-meanstack.html

#in this page you can run and distribute the application with other options to commit the dist directory

You will need to set environment variables for facebook auth:
        rhc set-env FACEBOOK_ID=id -a epgame
        rhc set-env FACEBOOK_SECRET=secret -a epgame

You will need to set environment variables for google auth:
        rhc set-env GOOGLE_ID=id -a epgame
        rhc set-env GOOGLE_SECRET=secret -a epgame

You will need to set environment variables for twitter auth:
        rhc set-env TWITTER_ID=id -a epgame
        rhc set-env TWITTER_SECRET=secret -a epgame


Your app should now be live at
        http://epgame-pitworks.rhcloud.com

You may need to address the issues mentioned above and restart the server for the app to work correctly
        rhc app-restart -a epgame
After app modification run
        grunt build
Then deploy with
        grunt buildcontrol:openshift
