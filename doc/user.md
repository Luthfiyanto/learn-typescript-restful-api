# User API Spec

## Register User

Endpont : POST /api/users

Request Body:

```json
{
  "username": "alfani",
  "password": "secret",
  "name": "Lulu Farida Alfani"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "alfani",
    "name": "Lulu Farida Alfani"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username must not blank. ..."
}
```

## Login User

Endpont : POST /api/users/login

Request Body:

```json
{
  "username": "alfani",
  "password": "secret"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "alfani",
    "name": "Lulu Farida Alfani",
    "token": "tokenadnabhcbhdbjabdj"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password invalid. ..."
}
```

## Get User

Endpont : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "username": "alfani",
    "name": "Lulu Farida Alfani"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized. ..."
}
```

## Update User

Endpont : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body:

```json
{
  "username": "alfani",
  "password": "secret", // optional
  "name": "Lulu Farida Alfani" //optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "alfani",
    "name": "Lulu Farida Alfani"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized. ..."
}
```

## Logout User

Endpont : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized. ..."
}
```
