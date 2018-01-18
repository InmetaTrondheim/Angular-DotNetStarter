# Angular-DotNetStarter
A starter project for Angular and DotNet Core.
After following this tutorial we shall be able to send data from a dotnet core webapi to Angular, and send data from Angular to a webapi endpoint.

# Prequisites
## NodeJS
Install it from [Node website](http://nodejs.org/)
## Visual Studio Code
Install it from [Microsoft](https://code.visualstudio.com) or your own preferred code editor.
## Angular.cli
Install it through console. The `-g` parameter install it as a global package so it's available on your computer, not only for this project.
```console
npm install -g @angular/cli
```
## Dotnet core 2.x
Install it from [Microsoft](https://www.microsoft.com/net/learn/get-started/)

# Create a new Angular Project
With the angular cli this is too simple. Just create a new folder on disk for this tutorial.

Then run to instantiate a new angular project with all the tools for you to start developing
```console
ng new client
```

To start your website
```console
cd client
ng s
```

If you now open a browser and goes to [localhost](http://localhost:4200) you will se a welcome screen saying 'Welcome to app'.

# Create a new Dotnet core webapi project
Open a new command window, you don't have to close the one where angular is running and make sure that the command windows is in the root folder of this tutorials folder. (Not inside client folder). To do this in Visual Studio Code View > Integrated Terminal and press the [+] button.
```console
dotnet new webapi webapi
