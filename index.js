const express = require( "express" )
const mongoose = require( "mongoose" )
const Note = require( "./models/note" ) 
const cors = require( "cors" )
const password = process.argv[2]

const app = express()

const requestLogger = ( request, response, next ) => {
	console.log( "Method: ", request.method )
	console.log( "Path: ", request.path )
	console.log( "Body: ", request.body )
	console.log( "---" )
	next()
}

const unknownEndpoint = ( request, response ) => {
	response.status( 404 ).send( { error: "unknown endpoint" } )
}

app.use( cors() )
app.use( express.static( "dist" ) )
app.use( express.json() )
app.use( requestLogger )
//app.use( unknownEndpoint )

const url =
  `mongodb+srv://susidkayevhen:${password}@cluster0.ddmeb4r.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set( "toJSON", {
	transform: ( document, returnedObject ) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
} )

const Note = mongoose.model('Note', noteSchema)

app.get( "/", ( request, response ) => {
	response.send( "<h1>Hello World!</h1>" )
} )

app.get(
	"/api/notes/:id",
	( request, response ) => {
		const id = Number( request.params.id )
		const note = notes.find( note => note.id === id )
		if( note ) {
			response.json( note )
		} else {
			response.status( 404 ).end()
		}
	}
)

app.delete(
	"/api/notes/:id",
	( request, response ) => {
		const id = Number( request.params.id )
		notes = notes.filter( note => note.id !== id )

		response.status( 204 ).end()
	}
)

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max( ...notes.map( n => n.id ) ) : 0
	return maxId + 1
}

app.post(
	"/api/notes",
	( request, response ) => {
		const body = request.body
	
		if( !body.content ) {
			return response.status( 400 ).json(
				{ error: "content missing" }
			)
		}
		
		const note = {
			content: body.content,
			important: body.important || false,
			id: generateId()
		}

		notes = notes.concat( note )

		response.json( note )
	}
)

app.get( "/api/notes", ( request, response ) => {
	Note.find({}).then( notes => {
		response.json( notes )
	} )
} )

const PORT = process.env.PORT || 3001
app.listen( PORT, () => {
	console.log( `Server running on port ${ PORT }` )
} )
