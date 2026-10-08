require "test_helper"

class SigsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sig = sigs(:one)
  end

  test "should get all sigs on index" do
    get sigs_url
    assert_response :ok
    json = JSON.parse(response.body)
    assert_kind_of Array, json
    assert json.length >= 2
  end

  test "should show sig by id" do
    get sig_url(@sig)
    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal @sig.id, json["id"]
    assert json.key?("members")
    assert json.key?("projects")
  end

  test "should show sig by name" do
    get sig_url(id: @sig.name.downcase)
    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal @sig.id, json["id"]
  end

  test "should return 404 for missing sig" do
    get sig_url(id: "nonexistent-sig-name")
    assert_response :not_found
  end
end
