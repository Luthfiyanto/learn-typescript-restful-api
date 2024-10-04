# Contact API Spec

## Create Contact

Endpont : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body:

```json
{
  "first_name": "Lulu Farida",
  "last_name": "Alfani",
  "email": "lulu@example.com",
  "phone": "089999999999"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Lulu Farida",
    "last_name": "Alfani",
    "email": "lulu@example.com",
    "phone": "089999999999"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "First_name must not blank. ..."
}
```

## Get Contact

Endpont : GET /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Lulu Farida",
    "last_name": "Alfani",
    "email": "lulu@example.com",
    "phone": "089999999999"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Contact is not found. ..."
}
```

## Update Contact

Endpont : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body:

```json
{
  "first_name": "Lulu Farida",
  "last_name": "Alfani",
  "email": "lulu@example.com",
  "phone": "089999999999"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Lulu Farida",
    "last_name": "Alfani",
    "email": "lulu@example.com",
    "phone": "089999999999"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized. ..."
}
```

## Remove Contact

Endpont : DELET /api/contacts/:id

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
  "errors": "Contact is not found. ..."
}
```

## Search Contact

Endpont : GET /api/contacts

Query Parameter:

- name: string, contact firstname or lastname, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Lulu Farida",
      "last_name": "Alfani",
      "email": "lulu@example.com",
      "phone": "089999999999"
    },
    {
      "id": 2,
      "first_name": "Lulu Farida",
      "last_name": "Alfani",
      "email": "lulu@example.com",
      "phone": "089999999999"
    },
    {
      "id": 3,
      "first_name": "Lulu Farida",
      "last_name": "Alfani",
      "email": "lulu@example.com",
      "phone": "089999999999"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized. ..."
}
```
