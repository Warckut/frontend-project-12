import socket from '../socket';

const chatApi = {
  sendMessage: (message) => new Promise((resolve, reject) => {
    socket.emit('newMessage', message, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve();
      }
    });
  }),
  newChannel: (name) => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response.data.id);
      }
    });
  }),
  removeChannel: (id) => new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve();
      }
    });
  }),
  renameChannel: ({ name, id }) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', { name, id }, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve();
      }
    });
  }),
};

export default chatApi;
