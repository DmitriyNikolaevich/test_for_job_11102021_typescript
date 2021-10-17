import React from 'react'
import { io } from 'socket.io-client'

export const socket = io('ws://test-for-job-11102021-ws-node.herokuapp.com/', { transports: ['websocket', 'polling', 'flashsocket'] })