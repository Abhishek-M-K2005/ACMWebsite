class ProjectProposalsController < ApplicationController
  def index
    @project_proposals = ProjectProposal.all
    @project_proposals = @project_proposals.where(sig_id: params[:sig_id]) if params[:sig_id].present?

    if params[:year].present?
      @project_proposals = @project_proposals.where(year: params[:year])
    end
    @project_proposals = @project_proposals.order(created_at: :desc)
    render json: @project_proposals.as_json(include: [:sig, :users]), status: :ok
  end

  def show
    @project_proposal = ProjectProposal.find(params[:id])
    
    render json: @project_proposal.as_json(
      include: {
        sig: {},
        users: {only: [:id, :name, :avatar_url]},
        reference_links: {}
      }
    ), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: 'Proposal not found'}, status: :not_found
  end
end