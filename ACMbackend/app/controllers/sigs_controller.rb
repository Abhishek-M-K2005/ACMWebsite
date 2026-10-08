class SigsController < ApplicationController

  def index
    @sigs = Sig.all
    render json: @sigs
  end


  def show
    @sig = if params[:id].to_s.match?(/\A\d+\z/)
             Sig.find_by(id: params[:id])
           else
             Sig.find_by("LOWER(name) = ?", params[:id].to_s.downcase)
           end

    if @sig
      render json: @sig.as_json(
        include: {
          members: { only: [:id, :name, :linkedin, :avatar_url] },
          projects: { only: [:id, :title, :cover_image_url] },
          media_assets: { only: [:id, :file_name, :file_url, :content_type] }
        }
      )
    else
      render json: { error: "SIG not found" }, status: :not_found
    end
  end
end