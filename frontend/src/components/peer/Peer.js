import Peer from 'peerjs';
import React from 'react';

export default class Peer extends React.Component {
  constructor(props) {
    super(props)
    let peer = new Peer();
    this.state = { peer: peer, conn: null };
  }

  function connect(connectId) {
    let connection = this.state.peer.connect(connectId);
    connection.on('open', function(data) {
      connection.send('Connected');
      this.setState({ conn: connection });
    });
  }

  function makeCall() {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }, (stream) => {
      const call = this.state.peer.call(peerId, stream);
      call.on('stream', (remoteStream) => {

      });
    }, (err) => {
      console.error('Failed to get peer stream', err);
    });
  }

  function answer() {
    this.state.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }, (stream) => {
        call.answer(stream);
        // call.on('stream', (remoteStream) => {
        //
        // });
      }, (err) => {
        console.error('Failed to get peer stream', err);
      });
    })
  }

}
