 Task Monitor - Employee Management System
A full-stack role-based web application for managing employees, monitoring daily tasks, and tracking payroll operations. Built with React, TailwindCSS, Firebase Auth, Node.js, Express, and MongoDB.

🔗 Live Links
🌐 Client Side: https://task-monitor-client.web.app/ 

⚙️ Server Side: https://task-monitor-server.vercel.app/


## Admin Credentials ##
Admin Email: admin1@gmail.com
Admin Password: *Admin1#

## Key Features :
1. Role-Based Authentication using Firebase: Employees and HR can register via email/password or social login (Google/GitHub), while Admin is added manually in DB.

2. Registration Validation: Strong password enforcement, dropdown for role selection (Admin restricted), imgbb for profile photo upload, and required fields like salary, designation, and bank account.

3. Home Page: Features company success banner, service highlights, testimonials slider, and other informative sections with consistent Navbar & Footer.

4. Employee Dashboard:

/work-sheet: Add/edit/delete work tasks with date picker and real-time table update.

/payment-history: Monthly salary history with pagination if over 5 entries.

5. HR Dashboard:

/employee-list: View and verify employees, trigger payment modal for verified employees, view employee details with dynamic bar chart.

/details/:slug: Displays salary trend chart and employee profile info.

/progress: Filter employee work by name and month with live hour summation.

6. Admin Dashboard:

/all-employee-list: Promote to HR, fire users (prevent login), and update salary (increase only).

/payroll: Approve HR-sent payment requests. Prevent double payment for same month/year.

7. Payment System: Stripe integration to simulate real payment gateway operations during payroll approval.

8. Contact Us: Public-facing form with dummy address. Stores messages viewable only by Admin.

9. Bonus Features:
Fully Responsive

Toggle between Table and Grid views.

Real-time UI updates without page reload.

10. Secure Backend APIs: Role-specific operations (like updating salary, verifying employees, paying salaries) are logically restricted on the client side. Backend JWT/Firebase token-based middleware for full role-based protection is planned but not yet implemented.