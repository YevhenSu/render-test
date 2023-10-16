# render-test

https://render-test-nj0v.onrender.com

### to get all notes in json
https://render-test-nj0v.onrender.com/api/notes

### to delete note with id
#### curl -X "DELETE" https://render-test-nj0v.onrender.com/api/notes/id

### to change note with id
#### curl -X "PUT" https://render-test-nj0v.onrender.com/api/notes/id -H 'Content-Type: application/json' -d '{"content": "<content to change>", "important": <true or false>}'

