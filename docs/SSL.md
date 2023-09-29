Generating SSL certificates for local development
=================================================

### - Windows:
Create and install certificate: https://medium.com/@praveenmobdev/localhost-as-https-with-reactjs-app-on-windows-a1270d7fbd1f

### - Linux/MacOS:
Create certificate: https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/
Install certificate: https://flaviocopes.com/react-how-to-configure-https-localhost/

### - Dotnet Core certificate
If you have dotnet core cli tools installed, just run the following command:
`dotnet dev-certs https --export-path ./cert.crt --no-password --format PEM`
