require('dotenv').config()
const express = require( "express" )
const Note = require( "./models/note" ) 
const cors = require( "cors" )

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

app.get(
	"/api/notes/:id",
	( request, response ) => {
		Note.findById( request.params.id ).then( note => {
			response.json( note )
		} )
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

app.post(
	"/api/notes",
	( request, response ) => {
		const body = request.body
	
		if( !body.content ) {
			return response.status( 400 ).json(
				{ error: "content missing" }
			)
		}
		
		const note = new Note( {
			content: body.content,
			important: body.important || false,
		} )

		note.save().then( savedNote => {
			response.json( note )
		} )
	}
)

app.get( "/api/notes", ( request, response ) => {
	Note.find({}).then( notes => {
		response.json( notes )
	} )
} )

const PORT = process.env.PORT
app.listen( PORT, () => {
	console.log( `Server running on port ${ PORT }` )
} )
