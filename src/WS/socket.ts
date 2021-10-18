import React from 'react'
import { io } from 'socket.io-client'

export const socket = io('ws://localhost:443/', { transports: ['websocket', 'polling', 'flashsocket'] })