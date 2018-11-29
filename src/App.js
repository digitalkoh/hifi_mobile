import React, { Component } from 'react';
import './App.css';

let defaultStyle ={
  color: "#fff"
}
let fakeServerData = {
  user: {
    name: 'Young Koh',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          {name: 'Temptation', duration: 1345}, 
          {name: 'Pictures of you', duration: 1890},
          {name: 'True faith', duration: 2334},
          {name: 'Disintegration', duration: 1299}
        ]
      },
      {
        name: 'Sad Songs',
        songs: [
          {name: 'Same deep water as you', duration: 1900}, 
          {name: 'Plain song', duration: 456},
          {name: 'Fade into you', duration: 879},
          {name: 'Close down', duration: 4120}
        ]
      },
      {
        name: 'Hard Ones',
        songs: [
          {name: 'Away from', duration: 1454}, 
          {name: 'Head like a hole', duration: 1234},
          {name: 'Hurt', duration: 122},
          {name: 'Closer', duration: 577}
        ]
      },
      {
        name: 'Weekly Happy Tunes',
        songs: [
          {name: 'Crash', duration: 1121}, 
          {name: 'Lullaby', duration: 1111},
          {name: 'Strange Love', duration: 3247},
          {name: 'Kiss me kiss me kiss me', duration: 746}
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists && this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
    }, [])

    let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration
    }, 0)
    
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '24%'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {

    // let playlistElements = []
    // if (this.state.serverData.user) {
    //   this.state.serverData.user.playlists.forEach(playlist =>
    //     playlistElements.push(<Playlist playlist={playlist} />)
    //   )
    // }

    return (
      <div className="App">
        {this.state.serverData.user ? 
          <div> 
            <h1 style={{...defaultStyle, fontSize: '44px'}}>
              {this.state.serverData.user.name}'s List
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter onTextChange={text => this.setState({filterString: text})} />
            
            {this.state.serverData.user.playlists.filter(playlist => 
              playlist.name.toLowerCase().includes(
                this.state.filterString.toLowerCase())
            ).map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : <h2 style={defaultStyle}>Loading...</h2>
        }
      </div>
    );
  }
}

export default App;
