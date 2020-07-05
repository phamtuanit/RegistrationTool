# RegistrationTool
This is small tool allo user to register an information. This tool look like Vote Tool and Google Form.
This project has two components. The first one is Server which provides some APIs for working on the file. The second is WebUI which help you do something with the data.


# Usage
## Deploy server
  - Download server [here](https://github.com/phamtuanit/RegistrationTool/blob/master/Release/Release.zip)
  - Create your data. **Reference.json** contains your data which will be displayed on user page. **Registration.json** contains result.

  ![phamtuantech](/Release/s-3.PNG)
  
  - Start server by running **1.StartServer.cmd**

  ![phamtuantech](/Release/s-1.PNG)

  - The server will be running. You need to remember server url (https://XXXXXXXXX.ngrok.io).
  
  ![phamtuantech](/Release/s-2.PNG)
  
  
## Create session
  - Access website [Registration Tool](https://phamtuanit.github.io/RegistrationTool)
  - Fill your information and server uri above then click **Register**

  ![phamtuantech](/Release/c-1.PNG)
  
  - Two links will be created. One for you and one for your client.
  
  ![phamtuantech](/Release/c-2.PNG)
  
  - Bellow is User page. Your client will use that page to vote / register
  
  ![phamtuantech](/Release/c-4.PNG)
  
  - Bellow is Admin page. You can check your data there.
  
  ![phamtuantech](/Release/c-3.PNG)
