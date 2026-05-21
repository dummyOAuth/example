using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

var issuer = (Environment.GetEnvironmentVariable("OAUTH_ISSUER") ?? "http://localhost:3000/p/demo").TrimEnd('/');
var clientId = Environment.GetEnvironmentVariable("OAUTH_CLIENT_ID") ?? "demo";
var clientSecret = Environment.GetEnvironmentVariable("OAUTH_CLIENT_SECRET") ?? "demo";
var appOrigin = (Environment.GetEnvironmentVariable("EXAMPLE_APP_ORIGIN") ?? "http://localhost:3010").TrimEnd('/');

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect(options =>
    {
        options.Authority = issuer;
        options.ClientId = clientId;
        options.ClientSecret = clientSecret;
        options.ResponseType = OpenIdConnectResponseType.Code;
        options.SaveTokens = true;
        options.GetClaimsFromUserInfoEndpoint = true;
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("email");
        options.CallbackPath = "/signin-oidc";
        options.RequireHttpsMetadata = issuer.StartsWith("https://", StringComparison.OrdinalIgnoreCase);
    });

builder.Services.AddAuthorization();
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", (HttpContext ctx) =>
{
    if (ctx.User.Identity?.IsAuthenticated == true)
    {
        var name = ctx.User.Identity.Name ?? "user";
        return Results.Content(
            $"<html><body><h1>ASP.NET Core + dummyoauth</h1><p>Signed in as {name}</p><p><a href=\"/auth/logout\">Sign out</a></p></body></html>",
            "text/html");
    }
    return Results.Content(
        $"<html><body><h1>ASP.NET Core + dummyoauth</h1><p>Issuer: <code>{issuer}</code></p><p>Register redirect: <code>{appOrigin}/signin-oidc</code></p><p><a href=\"/auth/login\">Sign in</a></p></body></html>",
        "text/html");
});

app.MapGet("/auth/login", () => Results.Challenge(new() { RedirectUri = "/" }));
app.MapGet("/auth/logout", async (HttpContext ctx) =>
{
    await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    await ctx.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);
    return Results.Redirect("/");
});

app.MapRazorPages();
app.Run();
