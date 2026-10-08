require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should register a new user" do
    assert_difference("User.count", 1) do
      post auth_register_url, params: {
        name: "New Student",
        email: "student@nitk.edu",
        password: "securepassword",
        password_confirmation: "securepassword"
      }, as: :json
    end

    assert_response :created
    json = JSON.parse(response.body)
    assert json["token"].present?
    assert_equal "New Student", json["user"]["name"]
  end

  test "should fail registration with invalid data and return 422" do
    assert_no_difference("User.count") do
      post auth_register_url, params: {
        name: "",
        email: ""
      }, as: :json
    end

    assert_response :unprocessable_entity
    json = JSON.parse(response.body)
    assert json["errors"].present?
  end

  test "should authenticate existing user" do
    post auth_login_url, params: {
      email: @user.email,
      password: "password123"
    }, as: :json

    assert_response :ok
    json = JSON.parse(response.body)
    assert json["token"].present?
    assert_equal @user.email, json["user"]["email"]
  end

  test "should return current user with valid token" do
    token = JWT.encode({ user_id: @user.id, exp: 24.hours.from_now.to_i }, Rails.application.secret_key_base)

    get auth_me_url, headers: { "Authorization" => "Bearer #{token}" }
    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal @user.id, json["id"]
  end

  test "should reject auth_me without token" do
    get auth_me_url
    assert_response :unauthorized
  end
end
