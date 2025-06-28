# Backend Setup Guide

## Overview
Your hobby backend is now fully functional with event management capabilities. The backend includes:

- **Hobby API**: CRUD operations for hobbies
- **Event API**: CRUD operations for events
- **Database**: MongoDB with Mongoose ODM
- **Frontend Integration**: All components now use the backend API

## Environment Setup

1. Create a `.env.local` file in the `front` directory with:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/hobby-app

# Example for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hobby-app?retryWrites=true&w=majority
```

## API Endpoints

### Hobbies
- `GET /api/hobby` - Get all hobbies
- `POST /api/hobby` - Create a new hobby
- `GET /api/hobby/[id]` - Get a specific hobby
- `PUT /api/hobby/[id]` - Update a hobby
- `DELETE /api/hobby/[id]` - Delete a hobby

### Events
- `GET /api/event` - Get all events
- `POST /api/event` - Create a new event
- `GET /api/event/[id]` - Get a specific event
- `PUT /api/event/[id]` - Update an event
- `DELETE /api/event/[id]` - Delete an event

## Database Models

### Hobby Model
```typescript
{
  title: String (required),
  image: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```typescript
{
  eventType: ObjectId (ref: 'Hobby', required),
  name: String (required),
  eventDate: Date (required),
  eventTime: String (required),
  eventLocation: String (required),
  maxParticipants: Number (required, min: 1),
  participants: [String] (default: []),
  description: String (required),
  organizer: String (default: "Г.Хулан"),
  status: String (enum: ["active", "cancelled", "completed"], default: "active"),
  createdAt: Date,
  updatedAt: Date
}
```

## Features Implemented

### ✅ Hobby Backend
- Full CRUD operations
- Validation and error handling
- MongoDB integration
- API routes with proper HTTP status codes

### ✅ Event Builder Backend Integration
- Event creation form connected to backend
- Real-time event listing
- Event filtering by hobby
- Form validation and error handling
- Success/error notifications

### ✅ Frontend Components Updated
- `AddEventDialog` - Now creates events via API
- `EventCard` - Displays real event data
- Event pages - Fetch and display events from backend
- Loading states and error handling

## Running the Application

1. Install dependencies:
```bash
cd front
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud service)

3. Create `.env.local` with your MongoDB connection string

4. Start the development server:
```bash
npm run dev
```

## Testing the Backend

1. **Create a Hobby**:
   - Go to `/user/event` to see hobbies
   - Use the hobby creation form (if available)

2. **Create an Event**:
   - Navigate to a specific hobby page (`/user/hobby/[id]`)
   - Click "Эвент үүсгэх" (Create Event)
   - Fill out the form and submit

3. **View Events**:
   - Events will appear on the hobby detail page
   - Events are filtered by the specific hobby

## Next Steps

To enhance the backend further, consider:

1. **User Authentication**: Add JWT-based authentication
2. **Event Participation**: Implement join/leave event functionality
3. **File Upload**: Add image upload for hobbies and events
4. **Search & Filtering**: Add search functionality for events
5. **Notifications**: Add real-time notifications for event updates
6. **Email Integration**: Send email notifications for event changes

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string format
- Verify network access (for Atlas)

### API Errors
- Check browser console for error messages
- Verify all required fields are provided
- Ensure proper data types (e.g., maxParticipants as number)

### Frontend Issues
- Clear browser cache
- Check for JavaScript errors in console
- Verify all dependencies are installed 