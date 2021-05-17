import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('New user connected')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(process.env.PORT || 3333, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
