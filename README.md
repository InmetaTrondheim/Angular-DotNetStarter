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

# How to read data from the api to Angular
Open a new console and open the `client` folder. Create a new service:
```console
ng generate service core/services/values --module=app
```
Copy this into the new file:
```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ValueService {
  apiUrl = "http://localhost:5000/api/"

  constructor(private _http: HttpClient) { }

  GetValues(): Observable<string[]> {
    const url = this.apiUrl + 'values';
    return this._http.get<string[]>(url);
  }
}
```
Our Angular app does not yet know about `HttpClient` which we inject in the constructor, so we must import `HttpClientModule` into `app.module.ts`.
```javascript
...
import { HttpClientModule } from '@angular/common/http';

@NgModule({
...
  imports: [ HttpClientModule ],
...
})
export class AppModule { }
```

We now need a component to read data from webapi. Generate a new component:
```console
ng generate component values
```
Copy the following into the new file `values.component.ts`
```javascript
import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../core/services/values.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css'],
  providers: [ValuesService]
})
export class ValuesComponent implements OnInit {

  values: string[];
  constructor(private _valuesService: ValuesService) { }

  ngOnInit() {
    this._valuesService.GetValues().subscribe(val => this.values = val);
  }

}
```
Open `values.component.html` and paste the following:
```html
<p *ngFor="let value of values">{{ value }}</p>
```
Go to `app.component.html` and replace it all with the following:
```html
<app-values></app-values>
```

The website [localhost:4200](http://localhost:4200) should now read which is the exact same data as given by our webapi
```
value1
value2
```

# Send data to webapi
Sending data to webapi is almost as easy as reading. We're going to use our existing values service, and on the webapi we're going to uppercase the input so that we easily can see that the data was touched by webapi.

Create a new component for sending data:
```console
ng generate component sendValues
```
Add this component to `app.component.html`
```html
<app-values></app-values>
<app-send-values></app-send-values>
```
Update our `values.service.ts`
```javascript
@Injectable()
export class ValuesService {
...

  SendValue(value: any): Observable<any> {
    const url = this.apiUrl +  'values';
    return this._http.post(url, value);
  }
}
```
Update `Controllers\ValuesController.cs` POST method to accept a string and make it uppercase. Also add a model to recieve data:
```csharp
...
namespace webapi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        ...
        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]FormData data)
        {
            data.Value = data.Value.ToUpper();
            return Ok(data);
        }
        ...
    }

    public class FormData {
        public string Value { get; set; }
    }
}

```
Remember to change the return type from `void` to `IActionResult`.

Open `app.module.ts` and import Angular `FormsModule`
```javascript
...
import { FormsModule }   from '@angular/forms';

@NgModule({
...
  imports: [ FormsModule ],
...
})
export class AppModule { }
```

Open `send-values.component.html` and copy the following:
```html
  <label for="toUpper">Value to make large</label>
  <input type="text" id="toUpper" placeholder="Enter desired text here" [(ngModel)]="textToUpper">
  <button type="button" (click)="send()">Send</button>
  <p>You entered: {{ textToUpper }}</p>
```
Open `send-values.component.ts` and copy the following:
```javascript
import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../core/services/values.service';

@Component({
  selector: 'app-send-values',
  templateUrl: './send-values.component.html',
  styleUrls: ['./send-values.component.css']
})
export class SendValuesComponent implements OnInit {

  textToUpper: string;
  constructor(private _valuesService: ValuesService) { }

  ngOnInit() {
  }

  send() {
    const formData = new FormData(this.textToUpper);
    this._valuesService.SendValue(formData).subscribe(value => this.textToUpper = value.value);
  }
}

export class FormData {
  value: string;

  constructor(value: string){ this.value = value; }
}
```
