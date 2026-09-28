class BlogsController < ApplicationController
  def index
    @blogs = Blog.order(published_at: :desc)

    render json: @blogs.as_json(
      include: {
        author: {only: [:id, :name, :email, :avatar_url]},
        tags: {only: [:id, :name]},
        categories: {only: [:id, :name]}
      }
    ), status: :ok
  end

  def show
    @blog = Blog.find(params[:id])
    render json: @blog.as_json(
      include: {
        author: {only: [:id, :name, :email, :avatar_url]},
        tags: {only: [:id, :name]},
        categories: {only: [:id, :name]}
      }
    ), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Blog Not found"}, status: :not_found
  end
end