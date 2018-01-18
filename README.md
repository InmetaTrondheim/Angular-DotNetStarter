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
mkdir webapi
cd webapi
dotnet new webapi
```
For simplicity we shall install dotnet watch, so our app will recompile on filechange simular to `ng serve`.
### Add a `Microsoft.DotNet.Watcher.Tools` package reference to the .csproj file:


```xml
<ItemGroup>
    <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="2.0.0" />
</ItemGroup> 
```
### Install the `Microsoft.DotNet.Watcher.Tools` package by running the following command:
```console
dotnet restore
```
### Execute the command by running
```console
dotnet watch run
```
Everytime a dotnet project file is changed, webapi will recompile for you.
Navigate to [localhost:5000](http://localhost:5000/api/values).
It should read: `["value1","value2"]`

Since Angular is running on port :4200 and dotnet on port :5000, then dotnet will not accept commands from another port/website domain other than from the same it is running on. For this we must enable CORS.
### To add CORS to the webapi project open `Startup.cs` and add `AddCors()` in `ConfigureServices()`
```Csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc();
    services.AddCors();
}
```
And allow `http://localhost:4200` with `app.UseCors(builder => builder.WithOrigins("http://localhost:4200"));`
```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
    app.UseMvc();
}
```
