class MembersController < ApplicationController
  def index
    scope = Member.includes(:core_position, :sig)

    if params[:core].present? && params[:core].to_s == 'true'
      scope = scope.where.not(core_position_id: nil)
    end

    if params[:sig_id].present?
      scope = scope.where(sig_id: params[:sig_id])
    end

    members = scope.order(:id).map do |m|
      format_member(m)
    end

    render json: members
  end

  def show
    member = Member.includes(:core_position, :sig).find(params[:id])
    render json: format_member(member)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Member not found" }, status: :not_found
  end

  private

  def format_member(m)
    sig_display_name = m.sig&.name == "ACMW" ? "ACM-W" : m.sig&.name
    {
      id: m.id,
      name: m.name,
      role: m.core_position&.name || "Member",
      sig: sig_display_name,
      subSig: m.sub_sig.presence || sig_display_name,
      photo: m.avatar_url.presence || "/dpimg/#{m.name.downcase.gsub(' ', '_')}.jpg",
      email: m.email,
      linkedin: m.linkedin
    }
  end
end
