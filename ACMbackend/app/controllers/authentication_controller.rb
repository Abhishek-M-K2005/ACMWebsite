class AuthenticationController < ApplicationController
  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = generate_token(@user.id)
      render json: {
        token: token, 
        user: {
          id: @user.id,
          name: @user.name,
          email: @user.email,
          sig_id: @user.sig_id
        }
      }, status: :ok
    else
      render json: { errors: 'Invalid email or password' }, status: :unauthorized
    end
  end
end