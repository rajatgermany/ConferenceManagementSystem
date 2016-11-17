# ConferenceManagementSystem
A Platform for uploading research papers to the conferences </br>
# Documentation
Four types of Users can use this platform </br>
**Chair** </br>
1.List all paper submissions.</br>
2.Look at a submissions (details, pdf download).</br>
3.Withdraw a submission.</br>
4.List all authors.</br>
5.Look at detail information.</br>
6.List all reviewers.</br>
7.List all reviews.</br>
8.Assign papers to reviewers.</br>
9.Conflict avoidance: an author is not allow to review his own paper.</br>


**Author**</br>
1.Create a new submission (if submission is open)</br>
2.Upload the paper (.pdf) </br>
3.Access current submissions (overview) </br>
4.Status: incompleted, completed, closed, accepted, rejected </br>
5.Look at a submission </br>
6.Edit a submission (if submission is open) </br>
7.Withdraw a submission </br>



**Reviewer** </br>
1.Access assigned submissions (overview + status) </br>
2.Look at an assigned submission </br>
3.Details, pdf download or view </br>
4.Make a review > template (if review is open) 
-reviewer expertise: (1) not familar w/ the topic - (5) expert
overall evaluation: (1) strong reject - (5) strong accept
- summary,
-Major strong points,
Major weak points,
Detailed comments </br>
5.Edit a review (if reviewing phase is open) </br>

**Admin** </br>
1.Accepts or Rejects User request for Role. Only after his acceptance one can perorm activities on the platform.

**User can Chat with other users online on the platform**
#User Manaul
1.Start mongoDb service
2.Run socket.js file
3.Get to Url: http://localhost:3500/ConferenceManagement/home
4.Login Pop will appear 
5.Register if first time User
6.Register as Chair , Reviewer or Author or Reviewer+Author
7.Wait for the request acceptance from the Admin
8.Admin homepage : http://localhost:3500/ConferenceManagement/admin
9.Login to Admin account with - **Email - rajatuiet@gmail.com** , **Password - rajat**
10.Accept/Reject User request
11.Login if Request accepted
12.Login as Chair 
  -MakeConfernce(Fill the Form)
  -View your own conferences
  -Manage - Will list all the papers uploaded to the Conference (View Author of the paper, Assign reviewer, UpdateStatus, ViewReview)
  
