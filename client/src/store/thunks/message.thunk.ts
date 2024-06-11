import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage } from '../../http'
import { message } from '../../types/messages'

export const sendMessageThunk = createAsyncThunk(
    "message/sendMessage",
    async (messageData: message) => {
        return await sendMessage(messageData)
    }
) 