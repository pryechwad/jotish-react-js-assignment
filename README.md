# Employee Management System - ReactJS Assignment

A fully responsive, modern ReactJS application for employee management with data visualization, camera integration, interactive maps, and comprehensive reporting features.

## Live Demo

Live URL: https://jotish-react-js-assignment.vercel.app/

Desktop View Demo: [Watch on Loom](https://www.loom.com/share/562d52ea5e2945e288245235c6ce4f6f)

Mobile View Demo: [Watch on Google Drive](https://drive.google.com/file/d/1uAq_QcM-MPbqa56PjCKR3aY9idVRs9lt/view?usp=sharing)

## Features

### Core Features (Assignment Requirements)

**1. Login Page**
- Secure authentication system
- Username: test | Password: 123456
- Beautiful gradient design with mobile responsiveness
- Demo credentials display
- Form validation and error handling
- Loading states with animations

**2. Employee List Page**
- Display employee data from REST API
- Desktop View: Responsive table with sortable columns
- Mobile View: Beautiful card-based layout with avatars
- Advanced search and filtering by name/designation
- City-based filtering
- Multi-column sorting (Name, Salary, City)
- Pagination with 10 items per page
- Real-time statistics cards
- Modern gradient action buttons (View, Edit, Delete)

**3. Employee Details Page**
- Comprehensive employee information display
- Professional card-based layout
- Employee photo management (capture/remove)
- Quick action buttons
- Export options (JSON, PDF)
- Salary slip generation
- Print-friendly design

**4. Camera Integration**
- Real-time camera access using device webcam
- Photo capture with preview
- Download - Save photo to device
- Retake - Capture new photo
- OK - Confirm and save to employee profile
- Photo appears in employee details (replaces avatar)
- Remove photo option with confirmation

**5. Data Visualization**
- Bar Chart: Top 10 employees by salary with interactive tooltips
- Pie Chart: Employee distribution by city with percentage labels
- Salary Distribution Chart: Salary range analysis (0-50k, 50k-100k, 100k-150k, 150k+)
- Responsive design with color-coded visualization
- Interactive legends and tooltips

**6. Interactive Map**
- Geographic visualization using React Leaflet
- Employee locations marked by city
- Clickable markers with employee details
- Zoom and pan functionality
- Custom map styling

### Additional Features (Beyond Requirements)

**7. Dashboard**
- Comprehensive overview with statistics
- Top earners list
- Salary distribution charts
- City-wise employee breakdown
- Department statistics
- Quick navigation cards
- Real-time data updates

**8. Payroll Management**
- Complete payroll system
- Total payroll calculations
- Department-wise salary breakdown
- City-wise salary analysis
- Professional PDF report generation
- Detailed employee salary table
- Summary statistics

**9. Reports System**
- Employee Report: CSV export with all employee data
- Salary Report: Professional PDF with department breakdown
- Attendance Report: Monthly attendance summary with statistics
- Custom Report: City-wise distribution and complete employee list
- Print-to-PDF functionality for all reports

**10. Attendance Management**
- Mark employee attendance (Present/Absent/Leave)
- Date-wise attendance tracking
- Real-time statistics
- Color-coded status indicators
- Modern gradient action buttons

**11. Settings Page**
- Company Profile: Manage company information
- Preferences: Currency, date format, timezone, language
- Notifications: Push notifications, email alerts, SMS alerts
- Security: Password change, 2FA, login history
- Tab-based navigation
- Professional UI with icons

**12. Employee Management Operations**
- Add Employee: Create new employee records
- Edit Employee: Update employee information
- Delete Employee: Remove employees with confirmation
- Salary Slip: Generate individual salary slips
- Photo Management: Capture and manage employee photos

**13. UI/UX Enhancements**
- Modern gradient color schemes
- Unique gradient combinations for stat cards (Cyan to Blue, Emerald to Teal, Violet to Purple, Orange to Red)
- Animated gradient sidebar
- Professional card layouts
- Smooth transitions and hover effects
- Shadow and depth effects
- Mobile-First Approach
- Tablet Optimization
- Desktop Full Features
- App-like mobile experience
- Touch-friendly interfaces
- Adaptive navigation
- Responsive tables convert to cards on mobile
- Toast notifications for all actions
- Confirmation modals for destructive actions
- Loading states with spinners
- Hover effects on buttons and cards
- Smooth page transitions
- Icon integration throughout

**14. Security Features**
- Protected routes with authentication guards
- Context-based state management
- Secure credential validation
- Session persistence with localStorage
- Photo data encryption in storage

## Tech Stack

**Core Technologies**
- React 19.2.0 - Latest React with hooks
- React Router DOM 7.13.0 - Client-side routing
- Vite 7.3.1 - Fast build tool and dev server

**Styling**
- Tailwind CSS 3.4.19 - Utility-first CSS framework
- Custom gradient animations
- Responsive design utilities

**Data Visualization**
- Recharts 3.7.0 - Charts and graphs
- Bar charts, pie charts, area charts
- Interactive tooltips and legends

**Maps**
- React Leaflet 5.0.0 - Interactive maps
- Leaflet 1.9.4 - Map library
- Custom markers and popups

**Camera**
- React Webcam 7.2.0 - Camera integration
- Photo capture and preview
- Base64 image encoding

**HTTP Client**
- Axios 1.13.5 - API requests
- Error handling
- Request/response interceptors

**Notifications**
- React Hot Toast 2.6.0 - Toast notifications
- Success, error, info messages
- Customizable styling

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository
```bash
git clone <repository-url>
cd jotish-react-js-assignment
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## Login Credentials

Demo Account:
- Username: test
- Password: 123456

## API Integration

Endpoint: https://backend.jotish.in/backend_dev/gettabledata.php

Request Body:
```json
{
  "username": "test",
  "password": "123456"
}
```

Response: Array of employee objects with fields:
- id - Employee ID
- name - Employee name
- designation - Job title
- city - Location
- salary - Annual salary

## Project Structure

```
jotish-react-js-assignment/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx    # Route protection
│   │   └── Sidebar.jsx            # Navigation sidebar
│   ├── context/
│   │   └── AuthContext.jsx        # Global state management
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Dashboard.jsx          # Dashboard overview
│   │   ├── List.jsx               # Employee list
│   │   ├── Details.jsx            # Employee details
│   │   ├── EditEmployee.jsx       # Edit employee
│   │   ├── Camera.jsx             # Photo capture
│   │   ├── PhotoResult.jsx        # Photo display
│   │   ├── Chart.jsx              # Data visualization
│   │   ├── Map.jsx                # Interactive map
│   │   ├── Payroll.jsx            # Payroll management
│   │   ├── Reports.jsx            # Report generation
│   │   ├── Attendance.jsx         # Attendance tracking
│   │   ├── Settings.jsx           # Application settings
│   │   └── SalarySlip.jsx         # Salary slip
│   ├── utils/
│   │   └── api.js                 # API utilities
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
└── README.md                       # Documentation
```

## Key Features Breakdown

**Employee Management**
- View all employees in table/card format
- Search and filter employees
- Sort by multiple columns
- Add new employees
- Edit employee details
- Delete employees with confirmation
- View detailed employee information
- Generate salary slips

**Photo Management**
- Capture photos using device camera
- Preview captured photos
- Download photos
- Retake photos
- Save photos to employee profiles
- Remove photos with confirmation
- Photos replace avatar letters

**Data Visualization**
- Bar chart - Top 10 salaries
- Pie chart - City distribution
- Salary range distribution
- Department statistics
- Real-time data updates
- Interactive charts with tooltips

**Reporting**
- Employee CSV export
- Salary PDF reports
- Attendance reports
- Custom reports
- Professional formatting
- Print-to-PDF functionality

**Attendance**
- Mark daily attendance
- Present/Absent/Leave status
- Date-wise tracking
- Statistics dashboard
- Color-coded indicators

**Payroll**
- Total payroll calculation
- Department breakdown
- City breakdown
- Average salary analysis
- Professional PDF reports
- Detailed employee salary table

## Design Highlights

**Color Scheme**
- Primary: Yellow/Gold (#EAB308)
- Secondary: Blue (#2563EB)
- Success: Green (#10B981)
- Danger: Red (#EF4444)
- Warning: Orange (#F97316)

**Gradients**
- Cyan to Blue
- Emerald to Teal
- Violet to Purple
- Orange to Red
- Yellow to Orange

**Typography**
- System fonts for optimal performance
- Bold headings for hierarchy
- Readable body text
- Monospace for credentials

**Spacing**
- Consistent padding and margins
- Responsive spacing (mobile to desktop)
- Proper whitespace usage

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## State Management

- Context API for global state
- localStorage for persistence
- React Hooks for local state
- useMemo for performance optimization

## Routing

All routes are protected except login:

- / - Login page
- /dashboard - Dashboard overview
- /list - Employee list
- /details/:id - Employee details
- /edit/:id - Edit employee
- /camera - Photo capture
- /photo-result - Photo display
- /chart - Data visualization
- /map - Interactive map
- /payroll - Payroll management
- /reports - Report generation
- /attendance - Attendance tracking
- /settings - Application settings
- /salary-slip/:id - Salary slip

## Best Practices Implemented

- Component-based architecture
- Reusable components
- Clean code with proper naming
- Proper error handling
- Loading states
- User feedback (toasts)
- Confirmation dialogs
- Responsive design
- Accessibility considerations
- Performance optimization
- Code splitting
- Lazy loading
- SEO-friendly structure

## Learning Outcomes

This project demonstrates:
- Modern React development
- State management with Context API
- API integration
- Responsive design
- Data visualization
- Camera integration
- Map integration
- PDF generation
- CSV export
- Form handling
- Route protection
- User authentication
- Toast notifications
- Modal dialogs

## Known Issues

None currently. All features are working as expected.

## Future Enhancements

- Real-time notifications
- Email integration
- SMS alerts
- Advanced analytics
- Role-based access control
- Multi-language support
- Dark mode
- Offline support
- PWA capabilities

## License

This project is created for assignment purposes.

## Author

Created as part of ReactJS Assignment - Jotish EMS

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Recharts for beautiful charts
- Leaflet for interactive maps
- All open-source contributors

---

Note: This is a demonstration project showcasing modern React development practices and comprehensive employee management features.

For any questions or issues, please contact support.

© 2024 Jotish EMS. All rights reserved.
