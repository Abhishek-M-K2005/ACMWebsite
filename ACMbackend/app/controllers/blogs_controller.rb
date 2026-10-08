class BlogsController < ApplicationController
  before_action :authorize_request, only: [:create]

  def index
    @blogs = Blog.order(published_at: :desc, created_at: :desc)

    render json: @blogs.as_json(
      include: {
        author: { only: [:id, :name, :email, :avatar_url] },
        tags: { only: [:id, :name] },
        categories: { only: [:id, :name] }
      }
    ), status: :ok
  end

  def show
    @blog = Blog.find(params[:id])
    render json: @blog.as_json(
      include: {
        author: { only: [:id, :name, :email, :avatar_url] },
        tags: { only: [:id, :name] },
        categories: { only: [:id, :name] }
      }
    ), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Blog Not found" }, status: :not_found
  end

  def create
    unless @current_user.can_write_blog?
      render json: { errors: "Forbidden: Only Webmaster and Core members can write blogs" }, status: :forbidden
      return
    end

    @blog = Blog.new(blog_params)
    @blog.author = @current_user
    @blog.writer_name = @current_user.name if @blog.writer_name.blank?
    @blog.writer_email = @current_user.email if @blog.writer_email.blank?
    @blog.published_at ||= Time.current

    # Handle categories & tags if passed as strings or arrays
    if params[:category_names].present?
      names = params[:category_names].is_a?(Array) ? params[:category_names] : params[:category_names].to_s.split(',').map(&:strip)
      @blog.categories = names.map { |n| Category.find_or_create_by(name: n.strip) }
    end

    if params[:tag_names].present?
      t_names = params[:tag_names].is_a?(Array) ? params[:tag_names] : params[:tag_names].to_s.split(',').map(&:strip)
      @blog.tags = t_names.map { |t| Tag.find_or_create_by(name: t.strip) }
    end

    if @blog.save
      render json: @blog.as_json(
        include: {
          author: { only: [:id, :name, :email, :avatar_url] },
          tags: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        }
      ), status: :created
    else
      render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def blog_params
    params.permit(:title, :subtitle, :content, :cover_image_url, :writer_name, :writer_email, :published_at)
  end
end