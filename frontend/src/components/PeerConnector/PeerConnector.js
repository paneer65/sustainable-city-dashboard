import Peer from 'peerjs';
import React from 'react';

export default class PeerConnector extends React.Component {
  constructor(props) {
    super(props)
    let peer = new Peer('thededlier-17');
    console.info('Peer id : ' + peer.id);
    this.state = { peer: peer, conn: null };
  }

  connect(connectId) {
    let connection = this.state.peer.connect(connectId);
    connection.on('open', function(data) {
      connection.send('Connected');
      console.log('Connected');
      this.state.peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }, (stream) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            console.log(remoteStream)
          });
        }, (err) => {
          console.error('Failed to get peer stream', err);
        });
      })
      this.setState({ conn: connection });
    });
  }

  makeCall(peerId) {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }, (stream) => {
      const call = this.state.peer.call(peerId, stream);
      call.on('stream', (remoteStream) => {
        console.log(remoteStream);
      });
    }, (err) => {
      console.error('Failed to get peer stream', err);
    });
  }

  answer() {
    this.state.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }, (stream) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          console.log(remoteStream);
        });
      }, (err) => {
        console.error('Failed to get peer stream', err);
      });
    })
  }

}
