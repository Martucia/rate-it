import { useEffect } from 'react';
import { SocketApi } from '../actions/comments';

export const useConnectSocket = () => {
    const connectSocket = () => {
        SocketApi.createConection();
    }

    useEffect(() => {
        connectSocket();
    }, [])
}