## [Say Treees!](https://shielded-gorge-81034.herokuapp.com/)
By Evan Wilson

This app allows users to create and manipulate data in a tree structure


### Built With

* React
* Node
* MongoDB/ Mongoose
* Express

### Deployment

Deployed to heroku (https://shielded-gorge-81034.herokuapp.com/)

### Development Schedule

**Phase 1**
Reasearch similar products and decide which technologies would best serve the application

**Phase 2**
Begin environment setup test for connectivity from client to server to db

**Phase 3**
Basic design and model setup, create numbers logic, db queries and display info from user input

**Phase 4**
Implement Socket.io for live updates

### Challenges
* The query to rename a factory is pretty straight forward, but the way my db model was configured created nesting problems
* Data structures is a tough subject for me, I will be studying things like trees, hash tables and sets in much greater detail immediately.
* Live view with socket or other tech... 

### Lessons Learned

It's all about planning. If I were to start over, I would begin with socket io. Once, that is funcional, I would be sure to model my data in such a way that is easy to query. It's tough to find out hours later that $rename doesn't work with nested arrays in MongoDB. I'm sure I can work around those types of issues, but why do more work when we can let the technology to if for us.**This was a great brain excersise!**

**Update**
Socket working
Node bypass secured
