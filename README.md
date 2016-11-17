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
1.Start mongoDb service</br>
2.Run socket.js file</br>
3.Get to Url: http://localhost:3500/ConferenceManagement/home </br>
4.Login Pop will appear </br>
5.Register if first time User </br>
6.Register as Chair , Reviewer or Author or Reviewer+Author </br>
7.Wait for the request acceptance from the Admin </br>
8.Admin homepage : http://localhost:3500/ConferenceManagement/admin </br>
9.Login to Admin account with - **Email - rajatuiet@gmail.com** , **Password - rajat** </br>
10.Accept/Reject User request </br>
11.Login if Request accepted </br>
12.**Login as Chair**  </br>
  - MakeConfernce(Fill the Form)
  - View your own conferences
  - Manage - Will list all the papers uploaded to the Conference (View Author of the paper, Assign reviewer to it, UpdateStatus, ViewReview)</br>
  
  
13.**Login as Author** </br>
  - After Successful Login, click on the **StartUploading** to explore all the Conferences </br>
  - Choose one of the Conference and uploads the Paper to the Category </br>
  - Wait for the Review </br>
  
14.**Login as Reviewer** </br>
  - After Successful Login, View  the ReviewFiles assigned 
  - Download the file 
  - Give the review using the ReviewTemplate
  - **Can Edit the Review until the paper is Open which is decided by the Chair of the Conference**
  
  
15.**Login Again as Chair** </br>
   - View the Review Assigned and Accordingly set the status to the paper </br>
16. **Login as Author** </br>
    - View the review to the paper
    
  

  
  
  
  
  
  
