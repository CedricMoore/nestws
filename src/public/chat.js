try {
  window.require = () => { Socket: { } };
  const { Socket } = require("socket.io");
} catch (e) { }

/** @type { Socket } */
const socket = io('http://192.168.1.8:3000');

document.addEventListener('alpine:init', () => {
  Alpine.data('chat', () => ({

    /** @type {string[]} - all the messages received */
    messages: [],

    /** @type {string} - the message written in the textbox */
    message: '',

    init() {
      // Receive message
      socket.on('message', (data) => {
        this.messages.push(data);
      })
    },

    /** 
     * @function
     * @param {string} msg - the message to send
     */
    sendMessage(msg) {


      socket.emit('message', msg);
    },

  }))
})
