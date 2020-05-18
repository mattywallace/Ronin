## WELCOME TO RONIN ##

Ronin is an open source learning management system for freelance instructors and students.
Instructors or admins create courses using Ronins flexible milestone feature that allows
students to easily show comptetnce and complience with course requirements. 
Get ready to sharpen your skills. 

+++++++++++ USER STORIES +++++++++++


+++++ Technologies +++++
React
Flask
Peewees playhouse 
React 
JSX
Heroku
Git
GitHub


+++++ Installation Steps +++++


If you wish to contribute to Ronin follow these simple steps:

Make two new directories name one Api and the other React

clone each of these links in their respective directories.

REACT SIDE 
git clone https://github.com/mattywallace/Ronin.git

Flask Side 
git clone https://github.com/mattywallace/RoninApi.git

In the React directory you can now run npm start in you terminal, you should be good to go on the front end if you use your local server. 

You need to set up envirnemnt varibales to run the python code however...

in you terminal run the command 

virtualenv .env -p python3

----this creates a directory called .env 

run the command 

source .env/bin/activate 

now run python app.py and you should be good to go. Just make sure you remember to 
.gitignore the .env file but typing .env inside the .gitignore. 




-----Basic User Fuctionality-----

A user registers an account and is brought to their portal page.
From the users portal they can view their current courses and courses in progress.
The user will be able to click on any of 4 options from a navigation bar. 
If the user clicks on HOME they will be brought back to the homepage. 
If the user clicks COURSE LIBRARY they will be taken to the course index. 
	Here the user can see all of the available courses and they can sign up for each of them. 
	They can also click their account settings, profile, home, or logout.
If the user clicks ACCOUNT SETTINGS they are taken to the user update page where they can edit any 
standing information or add new information to their profile. 
If the user clicks LOGOUT they will be logged of their account and taken back to the home page.
If the user wants to log back in they can click LOGIN and enter their credentials. 


-----Course Selection and Mileston Accomplishment-----

The user signes up for a course and is able to access the courses milestones 
The user can read milestones and upload any files that the instructor has laid out for them
	in the milestone. 
The user can see their in progress courses by clicking on profile in the nav bar.
After a milestone has been accomplished they can now complete them in succession until the course is complete 
	and they have earned their certification. 


-----User Delete-----
at anytime the user can delete their profile from the ACCOUNT SETTINGS option. 


+++++++++++ ADMIN STORIES +++++++++++

The admin registration is slightly different from the user register in that there are more steps to be completeted.
The admin needs to enter a description and upload any credentials that can strengthen their verification. 
The admin will have all of the account manupulation accessaability i.e. update and editing/ delete account. 
(STREACTH) 
	If the admin deletes their account all of their courses will be deleted as well as long as there are no students in it. 
The admin will be able to create a course and add milestones where they will describe and or provide sources and didrections for competency and advancement in the course. 
The admin will recieve notifications from the student when a milestone competency has been submited. 
They will be able to see these in the their home portal along with current courses. 
The admin will sign off on the competency and the next milestone will be unlocked for the student. 




+++++++++++ WIREFRAMES +++++++++++

Here are the [Ronin Wireframes](https://balsamiq.cloud/svr6vk3/p9kzhyl)