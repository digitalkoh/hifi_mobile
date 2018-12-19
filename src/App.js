import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

  }
  render() {

    let playlistToRender = 
      this.state.user && 
      this.state.playlists
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())) 
        : []

    return (
      <div className="App">
        {this.state.user ? 
          <div> 
            <h1 style={{...defaultStyle, fontSize: '44px'}}>
              {this.state.user.name}'s Playlist
            </h1>

                <PlaylistCounter playlists={playlistToRender} />
                <HoursCounter playlists={playlistToRender} />
                <Filter onTextChange={text => this.setState({filterString: text})} />
                
                {playlistToRender.map(playlist =>
                  <Playlist playlist={playlist} />
                )}

          </div> : <h2 style={defaultStyle}>
              <button onClick={()=> window.location = 'https://hifi-mobile.herokuapp.com/login'} style={{padding:'20px', fontSize:'20px', 'margin-top':'20px'}}>
              Sign in with Spotify
              </button>
          </h2>
        }
      </div>
    );
  }
}

export default App;
