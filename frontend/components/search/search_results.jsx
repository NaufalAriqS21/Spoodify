import React from 'react';
import ArtistIndex from '../util/artists/artist_container';
import AlbumIndex from '../util/albums/album_container';
import TrackIndex from '../util/tracks/track_container';
import PlaylistIndex from '../util/playlists/playlist_container';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SearchResults extends React.Component {
  render () {
    const section = this.props.match.params.section;
    return (
      <div className="search-results">
        <div className="rela-block content-nav">
          <ul className="content-nav-list">
            <li className="rela-inline">
              <Link to={`/search/top`}
                className={"rela-block app-link" + ((section === 'top') ? ' active' : '')}>
                Top Results
              </Link>
            </li>
            <li className="rela-inline">
              <Link to={`/search/artists`}
                className={"rela-block app-link" + ((section === 'artists') ? ' active' : '')}>
                Artists
              </Link>
            </li>
            <li className="rela-inline">
              <Link to={`/search/tracks`}
                className={"rela-block app-link" + ((section === 'tracks') ? ' active' : '')}>
                Tracks
              </Link>
            </li>
            <li className="rela-inline">
              <Link to={`/search/albums`}
                className={"rela-block app-link" + ((section === 'albums') ? ' active' : '')}>
                Albums
              </Link>
            </li>
            <li className="rela-inline">
              <Link to={`/search/playlists`}
                className={"rela-block app-link" + ((section === 'playlists') ? ' active' : '')}>
                Playlists
              </Link>
            </li>
          </ul>
        </div>

        <div className="rela-block search-section">
          <Route path="/search/top" render={() => (
            <div className="top-results">
              <div className="rela-block search-section"
                style={{order: (this.props.numArtists === 0 ? 2 : 1)}}>
                <h2>Artists</h2>
                <ArtistIndex searchTerm={this.props.searchTerm} />
              </div>
              <div className="rela-block search-section"
                style={{order: (this.props.numAlbums === 0 ? 2 : 1)}}>
                <h2>Albums</h2>
                <AlbumIndex searchTerm={this.props.searchTerm} />
              </div>
              <div className="rela-block search-section"
                style={{order: (this.props.numPlaylists === 0 ? 2 : 1)}}>
                <h2>Playlists</h2>
                <PlaylistIndex searchTerm={this.props.searchTerm} />
              </div>
              <div className="rela-block search-section"
                style={{order: (this.props.numTracks === 0 ? 2 : 1)}}>
                <h2>Tracks</h2>
                <TrackIndex searchTerm={this.props.searchTerm} />
              </div>
            </div>
          )}/>
          <Route path="/search/artists" render={
            () => <ArtistIndex searchTerm={this.props.searchTerm} />
          }/>
          <Route path="/search/tracks" render={
            () => <TrackIndex searchTerm={this.props.searchTerm} />
          }/>
          <Route path="/search/albums" render={
            () => <AlbumIndex searchTerm={this.props.searchTerm} />
          }/>
          <Route path="/search/playlists" render={
            () => <PlaylistIndex searchTerm={this.props.searchTerm} />
          }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  numArtists: Object.keys(state.entities.artists).length,
  numAlbums: Object.keys(state.entities.albums).length,
  numPlaylists: Object.keys(state.entities.playlists).length,
  numTracks: Object.keys(state.entities.tracks).length,
});

export default withRouter(connect(mapStateToProps)(SearchResults));
