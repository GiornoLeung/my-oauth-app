# My OAuth App

Vercel serverless functions — Teable OAuth proxy + API wrapper template.

## Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/google-oauth-callback` | GET | Google OAuth callback proxy — returns `code` + `state`. Stateless, no env vars required |
| `/api/teable-oauth-callback` | GET | Teable OAuth code → token exchange. Returns `access_token`, `refresh_token`, `expires_in` |
| `/api/teable-records` | GET | List all records in a Teable table |
| `/api/teable-records` | POST | Create a new record |
| `/api/teable-records` | DELETE | Delete a record |

## Usage

### Teable OAuth Token Exchange

```
GET /api/teable-oauth-callback?code={code}&state={state}
```

Exchanges OAuth authorization code for access/refresh tokens.

### Teable Records API

Read:
```
GET /api/teable-records?tableId=tblXXXXXX
```

Create:
```
POST /api/teable-records?tableId=tblXXXXXX
Content-Type: application/json

{ "fields": { "Name": "value" } }
```

Delete:
```
DELETE /api/teable-records?tableId=tblXXXXXX&recordId=recXXXXXX
```

## Environment Variables

All Teable credentials are read from environment variables (never hardcoded):

| Variable | Required | Description |
|----------|----------|-------------|
| `TEABLE_CLIENT_ID` | OAuth | Teable OAuth app client ID |
| `TEABLE_CLIENT_SECRET` | OAuth | Teable OAuth app client secret |
| `TEABLE_REDIRECT_URI` | OAuth | Redirect URI registered in Teable OAuth app |
| `TEABLE_API_TOKEN` | API | Personal API token for server-to-server calls |

## Deploy

Deploy to Vercel with env vars set in Vercel dashboard.

```bash
vercel --prod
```
