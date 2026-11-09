require "test_helper"

class MembersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @member = members(:one)
    @sig = sigs(:one)
  end

  test "should get all members on index" do
    get members_url
    assert_response :ok
    json = JSON.parse(response.body)
    assert_kind_of Array, json
    assert json.length >= 2

    # Verify JSON structure
    first = json.first
    assert first.key?("id")
    assert first.key?("name")
    assert first.key?("role")
    assert first.key?("sig")
    assert first.key?("subSig")
    assert first.key?("photo")
    assert first.key?("email")
    assert first.key?("linkedin")
  end

  test "should filter core members when core=true" do
    get members_url, params: { core: "true" }
    assert_response :ok
    json = JSON.parse(response.body)
    assert_kind_of Array, json
    # Fixtures :one and :two both have core positions assigned
    assert json.length >= 2
  end

  test "should filter members by sig_id" do
    get members_url, params: { sig_id: @sig.id }
    assert_response :ok
    json = JSON.parse(response.body)
    assert_kind_of Array, json
  end

  test "should show member by id" do
    get member_url(@member)
    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal @member.id, json["id"]
    assert_equal @member.name, json["name"]
  end

  test "should return 404 for non-existent member" do
    get member_url(id: 999999)
    assert_response :not_found
  end
end
