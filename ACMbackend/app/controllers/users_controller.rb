class UsersController < ApplicationController
  before_action :authorize_request, except: :create

  def create
    @user = User.new(user_params)

    if @user.save
      token = generate_token(@user.id)
      render json: { token: token, user: @user }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Current user info route
  def me
    render json: @current_user, status: :ok
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :phone_no, :linkedin, :sig_id, :core_position_id)
  end
end

UserController = UsersController
