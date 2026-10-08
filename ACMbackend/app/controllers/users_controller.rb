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
    render json: {
      id: @current_user.id,
      name: @current_user.name,
      email: @current_user.email,
      sig_id: @current_user.sig_id,
      core_position: @current_user.core_position&.name,
      is_core: @current_user.core_member?,
      is_webmaster: @current_user.webmaster?,
      can_write_blog: @current_user.can_write_blog?
    }, status: :ok
  end

  # Change password for authenticated user
  def change_password
    current_password = params[:current_password]
    new_password = params[:new_password]
    password_confirmation = params[:password_confirmation]

    if current_password.blank? || new_password.blank? || password_confirmation.blank?
      return render json: { error: 'Current password, new password, and confirmation are all required' }, status: :bad_request
    end

    unless @current_user.authenticate(current_password)
      return render json: { error: 'Current password is incorrect' }, status: :unauthorized
    end

    if new_password.length < 6
      return render json: { error: 'New password must be at least 6 characters long' }, status: :unprocessable_entity
    end

    if new_password != password_confirmation
      return render json: { error: 'New password and confirmation do not match' }, status: :unprocessable_entity
    end

    @current_user.password = new_password
    @current_user.password_confirmation = password_confirmation

    if @current_user.save
      render json: { message: 'Password updated successfully' }, status: :ok
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :phone_no, :linkedin, :sig_id, :core_position_id)
  end
end

UserController = UsersController
