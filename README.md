# Employee Management System - ReactJS Assignment

A fully responsive, modern ReactJS application for employee management with data visualization, camera integration, and interactive maps.

##  Features

### Core Features
- **Login Page**: Secure authentication (username: `testuser`, password: `Test123`)
- **Employee List**: Display employee data from REST API with responsive table/card views
- **Employee Details**: Detailed view of individual employee information
- **Camera Integration**: Capture photos using device camera
- **Photo Result**: Display and download captured photos

### Advanced Features
- **Data Visualization**: 
  - Bar chart showing top 10 employees by salary
  - Pie chart displaying employee distribution by city
  - Statistical cards with key metrics
- **Interactive Map**: Geographic visualization of employee locations using Leaflet
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Protected Routes**: Secure navigation with authentication guards

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **Recharts** - Data visualization (charts)
- **React Leaflet** - Interactive maps
- **React Webcam** - Camera integration
- **Axios** - API calls
- **Vite** - Build tool and dev server

##  Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd jotish-react-js-assignment
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

##  Login Credentials

- **Username**: `testuser`
- **Password**: `Test123`

##  Application Flow

1. **Login** → Enter credentials
2. **Employee List** → View all employees (table on desktop, cards on mobile)
3. **Employee Details** → Click any employee to view details
4. **Camera** → Capture photo from details page
5. **Photo Result** → View and download captured photo
6. **Charts** → View salary and city distribution analytics
7. **Map** → See employee locations on interactive map

##  Design Highlights

- **Gradient Backgrounds**: Modern gradient color schemes
- **Card-based Layout**: Clean, organized information display
- **Responsive Navigation**: Adaptive navigation for all screen sizes
- **Mobile-First**: Optimized for mobile devices with touch-friendly interfaces
- **Smooth Transitions**: Polished animations and hover effects
- **Accessible**: Proper contrast ratios and semantic HTML

##  API Integration

**Endpoint**: `https://backend.jotish.in/backend_dev/gettabledata.php`

**Request**:
```json
{
  "username": "test",
  "password": "123456"
}
```

##  Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx    # Route protection component
├── context/
│   └── AuthContext.jsx        # Global authentication state
├── pages/
│   ├── Login.jsx              # Login page
│   ├── List.jsx               # Employee list page
│   ├── Details.jsx            # Employee details page
│   ├── Camera.jsx             # Camera capture page
│   ├── PhotoResult.jsx        # Photo display page
│   ├── Chart.jsx              # Data visualization page
│   └── Map.jsx                # Interactive map page
├── utils/
│   └── api.js                 # API utility functions
├── App.jsx                    # Main app with routing
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

##  Key Components

### AuthContext
- Manages global authentication state
- Stores employee data
- Provides login/logout functionality

### ProtectedRoute
- Guards authenticated routes
- Redirects to login if not authenticated

### Responsive Design
- Mobile: Card-based layout
- Tablet: Adaptive grid layout
- Desktop: Full table view with all columns

##  Screenshots

1. **Login Page**: Modern gradient design with form validation
2. **Employee List**: Responsive table/card view with navigation
3. **Employee Details**: Clean card layout with employee information
4. **Camera**: Full-screen camera interface
5. **Photo Result**: Display captured photo with download option
6. **Charts**: Bar and pie charts with statistics
7. **Map**: Interactive map with employee locations

##  Security Features

- Protected routes with authentication
- Secure credential validation
- Context-based state management
- No sensitive data in localStorage

##  Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

##  Development Notes

- Component-based architecture for reusability
- Clean, readable code with proper naming conventions
- Minimal dependencies for optimal performance
- Tailwind CSS for consistent styling
- Mobile-first responsive design approach

## 🚀 Deployment

Build the project:
```bash
npm run build
```

The `dist` folder will contain the production-ready files.

##  Author

Created as part of ReactJS Assignment

## License

This project is created for assignment purposes.
