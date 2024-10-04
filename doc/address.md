# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Jalan Manggis",
  "city": "Semarang",
  "province": "Jawa Tengah",
  "postal_code": 99999
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Manggis",
    "city": "Semarang",
    "province": "Jawa Tengah",
    "country": "Indonesia",
    "postal_code": 99999
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Postal_code is required. ..."
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/:idAddress

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Manggis",
    "city": "Semarang",
    "province": "Jawa Tengah",
    "country": "Indonesia",
    "postal_code": 99999
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Address is not found. ..."
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/:idAddress

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Jalan Manggis",
  "city": "Semarang",
  "province": "Jawa Tengah",
  "postal_code": 99999
}
```

Response Body (Success):

```json
{
  "data": {
    "street": "Jalan Manggis",
    "city": "Semarang",
    "province": "Jawa Tengah",
    "country": "Indonesia",
    "postal_code": 99999
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Postal_code is required. ..."
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/:idAddress

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Address is not found. ..."
}
```

## List Address

Endpoint : GET /api/contacts/:idContact

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan Manggis",
      "city": "Semarang",
      "province": "Jawa Tengah",
      "country": "Indonesia",
      "postal_code": 99999
    },
    {
      "id": 2,
      "street": "Jalan Manggis",
      "city": "Semarang",
      "province": "Jawa Tengah",
      "country": "Indonesia",
      "postal_code": 99999
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Contact is not found. ..."
}
```
