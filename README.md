#MakerPF - iOS
![MakerPF icon](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/makerPFIcon.png)

### Prerequisites
- Have a mac computer with version 10.8.x or higher and xCode
 
### STEP 1: Download base project
We provide you a base MakerPF native project to easily create the iOS application.

- Download the base project from github <https://github.com/lafactoria/makerpf-ios>      
![Download Project](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/makerPF-download.png)   


### STEP 2: Copy MakerPF Content
Since MakerPF published project comes with the HTML5 one by default, we have to copy the abstract content to the native iOS project.   

1. Open the project with xCode (Double click **makerpf.xcodeproj**)   
2. Search the folder **www** in the left panel     
3. Right click to that folder and select ***Show in finder***   
![Copy content](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/showfinder.png)   
4. Replace the folder ***game*** with the one that you just published in MakerPF   
![Copy content 2](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/game.png)   


### STEP 3: Set project properties
Each android project needs to have a unique ID   

1. Select root in the project explorer
2. Open **project properties** panel and change project name to one that fits you
![Project id](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/projectID.png)
3. In the middle panel select project's **target/summary** to replace the icons for iPhone and iPad
![Project icon](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/icons.png)

### STEP 4: Test
It is very important to test the project before publishing to make sure it all works as expected.

1. Select **developer provisioning**
2. Select root in the project explorer
3. In the middle panel, select project's **target/build settings**
4. From the properties list, modify the **Code Signing (debug)**
![Developer sign](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/codeSign.png)
5. Plug in a real device
6. Click **Run** button **cmd+R**


### STEP 5: Publish

1. Select **Provisioning distribution**
2. Select root in the project explorer
3. In the middle panel, select project's **target/build settings**  
4. From the properties list , modify the **Code Signing (release)**
![Developer sign](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/codeSign.png)
5. In application's menu select **Product->Archive**
![Archive](https://dl.dropboxusercontent.com/u/18446966/MAKERPF_MANUAL_IMAGES/ios/archive.png)
6. When process completes, **Organizer** will open that lets lets you upload the application throug a easy wizard