# Auth Notes

## Objectives

- implement secure password storage
- implement authentication using sessions and cookies
- use sessions to protect resources
- use a database to store sessions WATCH THIS VIDEO AGAIN

### Implement secure password storage
Never store passwords in plain text, hash them instead.

password -> hashing function -> hash

Hass password before they are stored in the database.
use bcryptjs library

> When using sessions, the information is saved in the server.
> The cookie only needs the session id. 