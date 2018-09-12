class Api::PlaylistTracksController < ApplicationController

  def create
    @playlist_track = PlaylistTrack.new(pt_params)
    if @playlist_track.save
      @playlist = Playlist.find(pt_params[:playlist_id])
      render 'api/playlists/show'
    else
      render json: ["Invalid credentials"], status: 401
    end
  end

  def destroy
    @playlist_track = PlaylistTrack.find_by(id: params[:id])
    if @playlist_track
      pt = @playlist_track.dup
      @playlist_track.destroy
      render json: { playlistTrack: pt }
    else
      render json: ["Connection could not be found"], status: 404
    end
  end

  private

  def pt_params
    params.require(:playlist_track).permit(:playlist_id, :track_id)
  end
end