# MAJAZ API Routes Documentation

## Overview
All API routes return JSON with a consistent structure:
```json
{
  "success": true|false,
  "data": {...},      // On success
  "error": "...",     // On failure
  "details": [...]    // Additional error details (validation errors)
}
```

## Authentication Routes

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "phone": "+971501234567",
  "locale": "en"  // "en" or "ar"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+971501234567",
    "locale": "en",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST `/api/auth/[...nextauth]`
NextAuth endpoint for authentication (sign in, sign out, session).

**Sign In:**
```json
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

## Request Routes

### GET `/api/requests`
Get all requests for the authenticated user with pagination.

**Query Params:**
- `page` (default: 1)
- `limit` (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "requests": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### POST `/api/requests`
Create a new assessment request with payment intent.

**Request Body:**
```json
{
  "mode": "REMOTE_ASSESSMENT",
  "serviceTier": "REMOTE_48H",
  "country": "UAE",
  "serviceFeeAED": 49,
  "listingUrl": "https://emiratesauction.com/lot/123456",
  "depositAED": 1000,      // Optional for DELEGATED_BIDDING
  "depositPct": 20,        // Optional
  "sourcingBrief": "..."   // Optional for SOURCING mode
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "request": {...},
    "paymentClientSecret": "pi_..._secret_...",
    "depositClientSecret": "pi_..._secret_..."  // If deposit required
  }
}
```

### GET `/api/requests/[id]`
Get a single request with all relations (listing, vehicle, estimate, reports, events, messages).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "status": "COMPLETED",
    "mode": "REMOTE_ASSESSMENT",
    "serviceTier": "REMOTE_48H",
    "user": {...},
    "listing": {...},
    "vehicle": {...},
    "estimate": {...},
    "reports": [...],
    "events": [...],
    "messages": [...]
  }
}
```

### PATCH `/api/requests/[id]`
Update request status (typically used by admin/system).

**Request Body:**
```json
{
  "status": "COMPLETED"
}
```

### DELETE `/api/requests/[id]`
Soft delete a request (sets status to FAILED).

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Request deleted successfully"
  }
}
```

### GET `/api/requests/[id]/report`
Download or view the assessment report.

**Query Params:**
- `language` (default: "EN") - "EN" or "AR"
- `format` (default: "html") - "html" or "pdf"

**Response (HTML):**
Returns HTML content directly with `Content-Type: text/html`

**Response (PDF):**
```json
{
  "success": true,
  "data": {
    "type": "pdf",
    "url": "https://...",
    "reportId": "clx..."
  }
}
```

## Message Routes

### GET `/api/messages?requestId=[id]`
Get all messages for a request.

**Query Params:**
- `requestId` (required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "senderId": "clx...",
      "senderName": "John Doe",
      "senderType": "user",
      "content": "Hello, I have a question...",
      "attachments": [],
      "read": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/api/messages`
Send a new message.

**Request Body:**
```json
{
  "requestId": "clx...",
  "content": "Hello, I have a question about the report...",
  "attachments": ["https://..."]  // Optional
}
```

## Team Routes

### GET `/api/team`
Get all active team members.

**Query Params:**
- `role` (optional) - "INSPECTOR", "OPERATOR", or "ADMIN"

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "name": "Ahmed Al Mansouri",
      "nameAr": "أحمد المنصوري",
      "role": "INSPECTOR",
      "title": "Senior Inspector",
      "titleAr": "مفتش أول",
      "bio": "...",
      "bioAr": "...",
      "email": "ahmed@majaz.ae",
      "phone": "+971501234567",
      "image": "https://...",
      "location": "Dubai",
      "active": true,
      "inspectionsCompleted": 245,
      "rating": 4.95
    }
  ]
}
```

### GET `/api/team/[id]`
Get a single team member by ID.

## Webhook Routes

### POST `/api/webhooks/stripe`
Stripe webhook endpoint for payment events.

**Handled Events:**
- `payment_intent.succeeded` - Updates request status to PAYMENT_RECEIVED
- `payment_intent.payment_failed` - Updates request status to FAILED
- `charge.refunded` - Updates request status to REFUNDED

**Note:** This endpoint requires a valid Stripe signature header.

## Scraping Routes

### POST `/api/scrape`
Scrape a listing URL using Firecrawl.

**Request Body:**
```json
{
  "url": "https://emiratesauction.com/lot/123456",
  "requestId": "clx..."  // Optional - links to existing request
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://...",
    "source": "EMIRATES_AUCTION",
    "listing": {...},
    "scraped": {
      "html": "Available",
      "markdown": "Available",
      "photos": 12,
      "metadata": {...}
    }
  }
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Request not found"
}
```

### 400 Validation Error
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to process request"
}
```

## Authentication

Most routes require authentication via NextAuth session. Include credentials in requests:

```javascript
// Client-side example
import { getSession } from 'next-auth/react';

const session = await getSession();
if (!session) {
  // Redirect to login
}

// Make authenticated request
const response = await fetch('/api/requests', {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important for session cookies
});
```

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Firecrawl
FIRECRAWL_API_KEY="fc-..."
```

## Request Flow Example

1. **User Registration**
   ```
   POST /api/auth/register
   ```

2. **User Sign In**
   ```
   POST /api/auth/signin
   ```

3. **Create Assessment Request**
   ```
   POST /api/requests
   → Returns payment intent client secret
   ```

4. **User Completes Payment** (Stripe frontend)

5. **Stripe Webhook Received**
   ```
   POST /api/webhooks/stripe
   → Updates request status to PAYMENT_RECEIVED
   → Creates event log
   ```

6. **System Scrapes Listing**
   ```
   POST /api/scrape (internal or triggered)
   → Updates request status to SCRAPING → PARSING
   ```

7. **User Checks Status**
   ```
   GET /api/requests/[id]
   ```

8. **User Downloads Report**
   ```
   GET /api/requests/[id]/report?language=EN&format=pdf
   ```

9. **User Sends Message**
   ```
   POST /api/messages
   ```

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting middleware for production:

- Authentication endpoints: 5 requests per minute
- Scraping endpoint: 10 requests per hour per user
- Other endpoints: 100 requests per minute per user

## CORS

API routes are configured for same-origin requests only. If you need to enable CORS for external clients, add middleware.

## Testing

```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test creating request (requires authentication)
curl -X POST http://localhost:3000/api/requests \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"mode":"REMOTE_ASSESSMENT","serviceTier":"REMOTE_48H","serviceFeeAED":49}'
```
