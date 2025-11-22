# Her Beautiful Universe - Backend

Django REST API for the romantic 3D photo gallery application.

## Getting Started

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements/development.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The API will be available at [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Admin login
- `POST /api/auth/logout/` - Admin logout

### Memories
- `GET /api/memories/` - Get all memories (public excludes secrets)
- `GET /api/memories/{id}/` - Get specific memory
- `POST /api/memories/` - Create memory (admin only)
- `PATCH /api/memories/{id}/` - Update memory (admin only)
- `DELETE /api/memories/{id}/` - Delete memory (admin only)
- `POST /api/memories/upload/` - Upload file and get URL (admin only)
- `POST /api/memories/secret_reveal/` - Reveal secret memory access

### Settings
- `GET /api/settings/` - Get site configuration

### Admin Interface
- `/admin/` - Django admin interface

## Models

### Memory
- UUID primary key
- Title, caption, media URL
- 3D position (x, y, z, orbit radius)
- Category (romantic, adventure, milestone, everyday)
- Featured and secret flags
- Date and display order

### SiteSettings
- Camera rotation speed
- Particle count
- Music enabled flag
- Landing message

## File Upload

Files are uploaded to the `media/` directory and served via Django's media handling.
Allowed file types: JPEG, PNG, GIF, MP4
Maximum file size: 10MB

## Development vs Production

- Development: Uses SQLite database, includes debug toolbar
- Production: Configured for PostgreSQL, enhanced security settings

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# For production:
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```