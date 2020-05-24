# KanBan-Board-for-hiring
build a toy kanban board to manage the hiring process, similar to trello, where each column is corresponding to one stage of the hiring process
## Description
Let’s build a toy kanban board to manage the hiring process, similar to trello, where each column is corresponding to one stage of the hiring process. For example: 

[Applied] [Phone Screen] [On site] [Offered] [Accepted] [Rejected] 

We can (1)add new cards to the Applied column. Each card represents one candidate with some basic information such as name, education, contact ... (you can decide what information to show, this is not important.) and (2)(a resume file as an attachment). We can also leave comments to a card. 

A card can be (3)dragged and dropped into a different column, if we want to change its status, for example, from “Applied” to “Phone Screen”. 

(4)(Implement user login to protect this system). 
(5)(Interviewers and HRs can rate a candidate’s performance using 5 stars. And an average score shall be displayed.)

(6)(Once finished, Please also create a docker container to run your system with a one liner. )
(Ideally we should have one build.sh script to create the docker container with your code built and ready to run. And another script run.sh to start the docker with a mapped port, so that opening http://localhost:<port>/ should navigate to the management system. ( Or a deployment on a cloud provider with https access. ) )


## TODO
- [ ] start with the chat program(create-reate-app) blog,frontend, backend, and implement user login, connect to MongoDB.
- [ ] think about the overall schemes in the database, I need HR(login, password), I need candidates(name,education,contact,resume,(number of people rated, total rating -> average rating))
- [ ] create the Kanban board with functionality of HRs adding a card and adding comments
- [ ] add a drag and drop functionality
- [ ] add a uploading resume functionality
- [ ] add HR ratings functionality
- [ ] create a docker container
