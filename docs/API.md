# RealCode Phase 3 API Documentation

## Central Response Format
The backend consistently issues this envelope:

### Success Example
```json
{
  "success": true,
  "message": "Context created successfully",
  "data": { ... }
}
```

### Failure Example
```json
{
  "success": false,
  "message": "Validation failed: Missing required fields",
  "code": "VALIDATION_FAILED"
}
```

---

## 1. System Endpoints

### `GET /api/health`
Validates application and MongoDB lifecycle configuration.
**Response**: `200 OK`
```json
{
  "success": true,
  "service": "RealCode API",
  "database": "connected"
}
```

---

## 2. Master Data Endpoints

### `GET /api/languages`
Retrieves enabled sandbox languages. Ordered by display priority.
**Response**: `200 OK`

### `GET /api/domains`
Retrieves business constraints logic bounding categories. Determines dynamic skill suggestions for problems.
**Response**: `200 OK`

### `GET /api/tags` / `GET /api/categories`
Additional organizational master structures.
**Response**: `200 OK`

---

## 3. Problem Context Endpoints

### `GET /api/contexts`
List contexts stored under the currently authenticated user session.
**Query Parameters:**
- `page` (default 1)
- `limit` (max 50)
- `domain` (filter exact match)
- `difficulty` (filter match)

### `GET /api/contexts/:id`
Retrieves exactly one context scoped tightly by user permissions.

### `POST /api/contexts`
Constructs a new context artifact setting default Draft states.
**Body:** `ProblemContext` representation.
**Response:** `201 Created`

### `PUT /api/contexts/:id`
Updates an existing Draft payload before Deep Analysis conversion locking.
**Response:** `200 OK`

### `POST /api/contexts/:id/validate`
Perform dry-run structural validation guaranteeing fields aren't truncated by browser logic issues.
**Response Payload bounds check on:** `language`, `domain`, `difficulty`, `scenario`, `skills` >= 1 item minimums.
