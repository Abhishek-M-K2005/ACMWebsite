class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    if header.blank?
      render json: { errors: 'Missing token' }, status: :unauthorized
      return
    end

    begin
      # more on jwt gem: https://dev.to/mohhossain/a-complete-guide-to-rails-authentication-using-jwt-403p
      # more on secret_key_base: https://medium.com/@michaeljcoyne/understanding-the-secret-key-base-in-ruby-on-rails-ce2f6f9968a1
      @decoded = JWT.decode(header, Rails.application.secret_key_base)[0]
      @current_user = User.find(@decoded['user_id'])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: 'User not found' }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { errors: 'Invalid or missing token' }, status: :unauthorized
    end
  end

  def current_user_or_nil
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    return nil if header.blank?

    decoded = JWT.decode(header, Rails.application.secret_key_base)[0]
    User.find_by(id: decoded['user_id'])
  rescue JWT::DecodeError, StandardError
    nil
  end

  alias_method :authorise_request, :authorize_request

  private

  def generate_token(user_id)
    JWT.encode({user_id: user_id, exp: 24.hours.from_now.to_i}, Rails.application.secret_key_base)
  end
end
