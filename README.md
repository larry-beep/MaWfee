# Her Beautiful Universe 💕

A romantic 3D web application where memories float in a spherical universe. Users can explore memories, click to view details, and discover a hidden Heart Star memory. Admin can manage memories via a secure dashboard. Mobile experience gracefully degrades to a 2D gallery.

## Features

### ✨ Core Features
- **3D Universe**: Interactive spherical space with floating memory nodes
- **Memory Gallery**: Click memories to view photos/videos with navigation
- **Hidden Heart Star**: Secret discovery feature with celebration effects
- **Responsive Design**: Mobile-optimized with 2D gallery fallback
- **Background Music**: Romantic audio with volume control
- **Admin Dashboard**: Memory management and site configuration

### 🌟 Technical Highlights
- **Progressive Enhancement**: WebGL detection with graceful fallbacks
- **3D Positioning**: Memories placed on sphere surface using Fibonacci algorithm
- **Real-time Updates**: Django REST API with immediate UI updates
- **Touch Controls**: Mobile-friendly navigation and interactions
- **Performance Optimization**: LOD system and particle count adjustments

## Technology Stack

### Frontend
- **Next.js 16** + React 19 + TypeScript
- **Three.js** via react-three-fiber + @react-three/drei
- **Tailwind CSS 4** with custom design tokens
- **Framer Motion** for animations
- **Axios** for API communication

### Backend
- **Django 5.x** + Django REST Framework
- **PostgreSQL** (production) / SQLite (development)
- **Django-cors-headers** for frontend integration
- **Pillow** for image processing

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ and pip
- PostgreSQL (for production)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd MaWfee
```

2. **Backend Setup**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements/development.txt
cp .env.example .env
# Edit .env with your settings

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

3. **Frontend Setup**:
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local if needed

npm run dev
```

4. **Access the Application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Dashboard: http://localhost:8000/admin/

## Usage

### For Visitors
1. **Landing Page**: Experience the typewriter animation and enter the universe
2. **3D Universe**: Navigate using mouse/touch, click memory nodes to view
3. **Discover Secrets**: Find the hidden Heart Star in the 3D space
4. **Mobile Fallback**: Automatic 2D gallery for non-WebGL devices

### For Administrators
1. **Login**: Access `/admin` with Django superuser credentials
2. **Manage Memories**: Add, edit, delete memories with 3D positioning
3. **Upload Media**: Drag and drop photos/videos (10MB limit)
4. **Configure Settings**: Adjust rotation speed, particle count, music

## Project Structure

```
MaWfee/
├── backend/                 # Django REST API
│   ├── config/             # Django project settings
│   ├── memories/           # Memory management
│   ├── authentication/     # Admin authentication
│   ├── settings_app/       # Site configuration
│   └── media/              # Uploaded files
└── frontend/               # Next.js application
    ├── app/                # App Router pages
    ├── components/         # React components
    │   ├── 3d/            # Three.js components
    │   ├── layout/        # Navigation components
    │   └── ui/            # Reusable UI
    ├── lib/                # API and utilities
    └── public/             # Static assets
```

## Special Features

### 🔍 Hidden Heart Star
- Located at coordinates (8, 4, -3) in 3D space
- Glowing dodecahedron shape with particle effects
- Triggers celebration animation when discovered
- Progress saved to localStorage

### 🎵 Background Music
- Romantic background track with volume control
- Browser-compliant user interaction required to start
- Persistent state across navigation

### 📱 Mobile Optimization
- WebGL capability detection
- Automatic fallback to 2D gallery
- Touch-friendly navigation
- Reduced particle count for performance

## Configuration

### Environment Variables

**Backend (.env)**:
```bash
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=your_database  # Production only
DB_USER=your_user      # Production only
DB_PASSWORD=your_pass  # Production only
```

**Frontend (.env.local)**:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Customization

**Design Tokens** (in `app/globals.css`):
```css
:root {
  --bg-primary: #0b1020;
  --bg-secondary: #1a1f3a;
  --accent-primary: #9b6cff;
  --accent-secondary: #ff6b8a;
  --accent-star: #f6f7ff;
}
```

## Deployment

### Production Deployment
1. **Backend**: Configure PostgreSQL, set `DEBUG=False`, update `ALLOWED_HOSTS`
2. **Frontend**: Set `NEXT_PUBLIC_API_URL` to production backend URL
3. **Static Files**: Configure Django static files serving
4. **Media Files**: Ensure proper file permissions and serving

### Docker Support
This project uses traditional Django + npm workflows (no Docker included).

## Contributing

This is a personal romantic project. Contributions should align with the romantic and emotional theme of the application.

## License

This project is a personal creation intended for romantic expression.

## Support

For technical issues:
1. Check the README files in `backend/` and `frontend/`
2. Verify environment variables are properly configured
3. Ensure all dependencies are installed
4. Check browser compatibility for 3D features

---

*Made with love, for the most beautiful universe of all.* 💖