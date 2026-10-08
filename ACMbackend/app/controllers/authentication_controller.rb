class AuthenticationController < ApplicationController
  def login
    email = params[:email].to_s.strip.downcase

    unless email.match?(/\A[a-zA-Z0-9._%+-]+@nitk\.edu\.in\z/i)
      render json: { errors: 'Access restricted: Only official @nitk.edu.in email accounts are permitted.' }, status: :unauthorized
      return
    end

    @user = User.find_by("LOWER(email) = ?", email)

    if @user&.authenticate(params[:password])
      token = generate_token(@user.id)
      render json: {
        token: token, 
        user: {
          id: @user.id,
          name: @user.name,
          email: @user.email,
          sig_id: @user.sig_id,
          core_position: @user.core_position&.name,
          is_core: @user.core_member?,
          is_webmaster: @user.webmaster?,
          can_write_blog: @user.can_write_blog?
        }
      }, status: :ok
    else
      render json: { errors: 'Invalid email or password' }, status: :unauthorized
    end
  end
end