class ProjectsController < ApplicationController
  def index
    @projects = Project.all
    @projects = @projects.where(sig_id: params[:sig_id]) if params[:sig_id].present?
    if params[:year_id].present? && params[:year_id] != 'all'
      @projects = @projects.where(year_id: params[:year_id])
    elsif params[:year].present? && params[:year] != 'all'
      year_record = Year.find_by(year: params[:year])
      @projects = @projects.where(year_id: year_record.id) if year_record
    elsif params[:current].present? && params[:current].to_s == 'true'
      current_time = Time.current
      academic_year = current_time.month > 4 ? current_time.year : current_time.year - 1
      current_year_record = Year.find_by(year: academic_year)
      @projects = @projects.where(year_id: current_year_record.id) if current_year_record
    end
    @projects = @projects.order(created_at: :desc)
    render json: @projects.as_json(include: [:sig, :year]), status: :ok
  end

  def show
    @project = Project.find(params[:id])
    render json: @project.as_json(include: [:sig, :year]), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Couldn't find the project."}, status: :not_found
  end
end