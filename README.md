# WARNING: This repository is no longer maintained :warning:

> This repository will not be updated. The repository will be kept available in read-only mode.

## Steps

1. [Install docker](#1-install-docker)
2. [Configuration](#2-configuration)
3. [Run](#3-run)

### Install Docker

Check the official [Docker documentation](https://docs.docker.com/engine/) for information how to install Docker on your operating system. And then install Docker and supporting tools.


## Configuration

copy .env_client and rename it to .env
Update the environment variables if necessary. You should not need to update the variables if your intention
is to run the app for demonstration.

## 3. Run

### Run using Docker

Run the command below to start the application using Docker. It would automatically install the dependencies
and run the application in Docker Container

```bash
docker-compose up
```

### Using your local development environment

Your application is running at: `http://localhost:5000/` in your browser.

#### Endpoints

### Create a note

Create a basic note

* URL: `/v1/note`
* Method: POST
* Request: A json object with `content` and `tags`
```json
{
  "content": "Don't forget to upload screenshots",
  "tags": [
    "work", "project-1"
  ]
}
```
* Response: 200 Status Code, A full Note
```json
{
  "id": 553364,
  "content": "Don't forget to upload screenshots",
  "tags": [
    "work",
    "project-1"
  ]
}
```

Example Request:
```bash
curl -X POST "http://127.0.0.1:8000/v1/note" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"content\":\"Don't forget to upload screenshots\",\"tags\":[\"work\",\"project-1\"]}"
```

### Funny Random note

Create a funny note based on two APIs.

1) Call [Random User Generator](https://randomuser.me/) and extract the First and Last Name of the returned user.
2) Call [The Internet Chuck Norris Database](http://www.icndb.com/api/) and pass the First and Last name collected in the previous step as parameters

* URL: `/v1/note/funny`
* Method: POST
* Response: 200 Status Code, A note with a Chuck Norris fact, but attributed to a random user, and the tag `funny`
```json
{
  "id": 10,
  "content": "Luukas Niskanen does not code in cycles, he codes in strikes.",
  "tags": [
    "funny"
  ]
}
```

Example Request:
```bash
curl -X POST "http://127.0.0.1:8000/v1/note/funny" -H  "accept: application/json"
```

### Get all the notes

Get all the notes stored in the system

* URL: `/v1/note`
* Method: GET
* Response: 200 Status Code, A list of notes
```json
[
  {
    "id": 5,
    "content": "COMPLETED: My task",
    "tags": [
      "study",
      "completed"
    ]
  },
  {
    "id": 6,
    "content": "It is believed dinosaurs are extinct due to a giant meteor. That's true if you want to call Elena Castro a giant meteor.",
    "tags": [
      "funny"
    ]
  },
  {
    "id": 7,
    "content": "Agnes Rodrigues eats lightning and shits out thunder.",
    "tags": [
      "funny"
    ]
  },
  {
    "id": 8,
    "content": "When Bruce Banner gets mad, he turns into the Hulk. When the Hulk gets mad, he turns into Olivia Justi.",
    "tags": [
      "funny"
    ]
  },
  {
    "id": 9,
    "content": "Sammy Douglas can build a snowman out of rain.",
    "tags": [
      "funny"
    ]
  }
]
```

Example Request:
```bash
curl -X GET "http://127.0.0.1:8000/v1/note" -H  "accept: application/json"
```

### Delete all notes

Delete all the notes in the system

* URL: `/v1/note`
* Method: DELETE
* Response: 204 Status Code, empty body

Example Request:
```bash
curl -X DELETE "http://127.0.0.1:8000/v1/note" -H  "accept: */*"
```

### Get one note

Get a note stored in the system, or an error message if doesn't exist.

* URL: `/v1/note/{id}`
* Method: GET
* Response: 200 Status Code, A single Note
```json
{
  "id": 10,
  "content": "Luukas Niskanen does not code in cycles, he codes in strikes.",
  "tags": [
    "funny"
  ]
} 
```

_or_ 404, error message

```json
{
  "message": "Note with ID 1 not found",
  "id": 1
}
```


Example Request:
```bash
curl -X GET "http://127.0.0.1:8000/v1/note/10" -H  "accept: application/json"
```

### Update a note

Update a note

* URL: `/v1/note/{id}`
* Method: PUT
* Request: A json object with `content` and `tags`
```json
{
  "content": "Not funny anymore",
  "tags": [
    "boring"
  ]
}
```
* Response: 200 Status Code, A full Note
```json
{
  "id": 553364,
  "content": "Not funny anymore",
  "tags": [
    "boring"
  ]
}
```

_or_ 404, error message

```json
{
  "message": "Note with ID 1 not found",
  "id": 1
}
```


Example Request:
```bash
curl -X PUT "http://127.0.0.1:8000/v1/note/553364" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"content\":\"Not funny anymore\",\"tags\":[\"boring\"]}"
```

### Delete one note

Delete one note

* URL: `/v1/note/{id}`
* Method: DELETE
* Response: 204 Status Code, empty body

Example Request:
```bash
curl -X DELETE "http://127.0.0.1:8000/v1/note/1" -H  "accept: */*"
```

### Get all the notes for a tag

Get all the notes with the same tag

* URL: `/v1/note/tag/{tag}`
* Method: GET
* Response: 200 Status Code, A list of notes
```json
[
  {
    "id": 6,
    "content": "It is believed dinosaurs are extinct due to a giant meteor. That's true if you want to call Elena Castro a giant meteor.",
    "tags": [
      "funny"
    ]
  },
  {
    "id": 7,
    "content": "Agnes Rodrigues eats lightning and shits out thunder.",
    "tags": [
      "funny"
    ]
  },
  {
    "id": 8,
    "content": "When Bruce Banner gets mad, he turns into the Hulk. When the Hulk gets mad, he turns into Olivia Justi.",
    "tags": [
      "funny"
    ]
  },
  {
    "id": 9,
    "content": "Sammy Douglas can build a snowman out of rain.",
    "tags": [
      "funny"
    ]
  }
]
```

Example Request:
```bash
curl -X GET "http://127.0.0.1:8000/v1/note/tag/funny" -H  "accept: application/json"
```

### Get all tags

Get all the tags stored in the system

* URL: `/v1/tags`
* Method: GET
* Response: 200 Status Code, A list of tags
```json
[
  "boring",
  "work",
  "study"
]
```

