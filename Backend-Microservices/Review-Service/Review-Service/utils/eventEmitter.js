// utils/eventEmitter.js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('review:posted', (data) => {
  console.log('✅ New review posted:', data);
  // Notify hotel dashboard or analytics service
});

module.exports = emitter;
