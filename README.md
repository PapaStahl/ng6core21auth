# ng6core21auth
Modified DotNet core template with angular 6, using Microsoft.AspNetCore.Identity

possible enhancement: https://github.com/openiddict/openiddict-core

good articles:

https://blogs.msdn.microsoft.com/webdev/2016/10/27/bearer-token-authentication-in-asp-net-core/
https://blogs.msdn.microsoft.com/webdev/2017/04/06/jwt-validation-and-authorization-in-asp-net-core/


Steps:

<ol>
<li> <code>dotnet new angular</code> (in folder with name of the project)</li>
<li> backup ClientApp folder</li>
<li> delete ClientApp folder
<li> use <code>ng new ClientApp</code> to recreate it in the version i want</li>
<ul>
<li> optional merge some of the layouts and components back in (if so desired)</li>
</ul>
</li>
<li> create MVC project <code>dotnet new mvc --auth Individual</code> in another folder </li>
<li> copy data, migrations, and the SqLite db</li>
<li> copy EF setting in project file, appSettings.json and startup.cs</li>
</ol>


