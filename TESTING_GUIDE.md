# Testing Guide & Screenshot Checklist

## 🧪 Testing Steps

### 1. Login Page Testing
- [ ] Open application at `http://localhost:5173`
- [ ] Try invalid credentials (should show error)
- [ ] Enter valid credentials: `testuser` / `Test123`
- [ ] Verify successful login and redirect to list page
- **Screenshot**: Login page with demo credentials visible

### 2. Employee List Page Testing
- [ ] Verify all employees are displayed
- [ ] Test responsive design (resize browser)
- [ ] Mobile view: Check card layout
- [ ] Desktop view: Check table layout
- [ ] Click "Charts" button
- [ ] Click "Map" button
- [ ] Click "Logout" button
- **Screenshots**: 
  - Desktop table view
  - Mobile card view
  - Navigation buttons

### 3. Employee Details Page Testing
- [ ] Click on any employee from the list
- [ ] Verify all employee details are displayed
- [ ] Check responsive layout
- [ ] Click "Capture Photo" button
- [ ] Click "Back to List" button
- **Screenshot**: Employee details page

### 4. Camera Page Testing
- [ ] Allow camera permissions when prompted
- [ ] Verify camera feed is visible
- [ ] Click "Capture Photo" button
- [ ] Verify redirect to photo result page
- **Screenshot**: Camera interface with live feed

### 5. Photo Result Page Testing
- [ ] Verify captured photo is displayed
- [ ] Click "Download Photo" button
- [ ] Verify photo downloads successfully
- [ ] Click "Retake Photo" button
- [ ] Click "Back to List" button
- **Screenshot**: Captured photo display

### 6. Charts Page Testing
- [ ] Verify bar chart displays top 10 employees
- [ ] Verify pie chart shows city distribution
- [ ] Check statistics cards (Total Employees, Average Salary, Cities)
- [ ] Test responsive layout
- [ ] Hover over chart elements for tooltips
- **Screenshots**: 
  - Full charts page
  - Chart tooltips

### 7. Map Page Testing
- [ ] Verify map loads correctly
- [ ] Check markers for different cities
- [ ] Click on markers to see employee details
- [ ] Verify city distribution cards below map
- [ ] Test zoom and pan functionality
- **Screenshots**: 
  - Map with markers
  - Marker popup with employee details
  - City distribution cards

### 8. Responsive Design Testing

#### Mobile (320px - 767px)
- [ ] Login page layout
- [ ] List page card view
- [ ] Details page layout
- [ ] Camera full screen
- [ ] Charts stacked vertically
- [ ] Map responsive height

#### Tablet (768px - 1023px)
- [ ] All pages adapt properly
- [ ] Navigation buttons visible
- [ ] Charts side by side
- [ ] Table/card hybrid view

#### Desktop (1024px+)
- [ ] Full table view on list page
- [ ] Charts side by side
- [ ] Optimal spacing and layout

### 9. Navigation Testing
- [ ] Test all navigation buttons
- [ ] Verify protected routes (try accessing /list without login)
- [ ] Test browser back button
- [ ] Test logout functionality

### 10. Error Handling Testing
- [ ] Test with no internet connection
- [ ] Test invalid routes
- [ ] Test camera permission denied
- [ ] Test API failure scenarios

## 📸 Required Screenshots

1. **Login Page** - Show the login form with demo credentials
2. **Employee List (Desktop)** - Table view with all columns
3. **Employee List (Mobile)** - Card view layout
4. **Employee Details** - Full details page
5. **Camera Interface** - Live camera feed
6. **Photo Result** - Captured photo with buttons
7. **Charts Page** - Bar chart and pie chart
8. **Map Page** - Interactive map with markers
9. **Map Popup** - Marker popup showing employee details
10. **Responsive Views** - Side-by-side mobile and desktop views

## 🎥 Screen Recording Checklist

Record a complete walkthrough showing:

1. **Start** - Application launch
2. **Login** - Enter credentials and login
3. **List Page** - Scroll through employee list
4. **Details** - Click on an employee
5. **Camera** - Capture a photo
6. **Photo Result** - View and download photo
7. **Charts** - Navigate to charts, interact with graphs
8. **Map** - Navigate to map, click markers
9. **Responsive** - Resize browser to show responsive design
10. **Logout** - Logout and return to login page

## 🔧 Tools for Screenshots & Recording

### Screenshots
- Windows: Snipping Tool, Win + Shift + S
- Mac: Cmd + Shift + 4
- Browser: DevTools device toolbar for mobile views

### Screen Recording
- Windows: Xbox Game Bar (Win + G), OBS Studio
- Mac: QuickTime Player, Cmd + Shift + 5
- Browser: Chrome DevTools Recorder
- Online: Loom, ScreenRec

## 📱 Testing Responsive Design

### Using Browser DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl + Shift + M)
3. Test these devices:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1920px)

## ✅ Final Checklist

- [ ] All features working correctly
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] All screenshots captured
- [ ] Screen recording completed
- [ ] Code is clean and commented
- [ ] README is updated
- [ ] Project is ready for submission

## 🚀 Quick Start for Testing

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173

# Login with: testuser / Test123
```

## 📝 Notes

- Test on actual mobile devices if possible
- Check camera permissions in browser settings
- Ensure stable internet for API calls
- Test in different browsers (Chrome, Firefox, Safari)
- Clear browser cache if experiencing issues
