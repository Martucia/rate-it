// import { Socket } from "socket.io-client/debug";

// let socket: Socket;

// export const initializeSocket = (dispatch) => {
//     const token = getToken();
//     const options = {
//         transportOptions: {
//             polling: {
//                 extraHeaders: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             }
//         }
//     }

//     socket = io(SOCKET_URL, options);

//     socket.on('comment', (comment) => {
//         dispatch({ type: 'NEW_COMMENT', payload: comment });
//     });

//     // Додайте обробку інших подій тут

//     return socket;
// };

// export const closeSocket = () => {
//     if (socket) {
//         socket.close();
//     }
// };
