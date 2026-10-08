require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @project = projects(:one)
  end

  test "should get all projects on index" do
    get projects_url
    assert_response :ok
    json = JSON.parse(response.body)
    assert_kind_of Array, json
    assert json.length >= 2
  end

  test "should filter projects by sig_id" do
    get projects_url, params: { sig_id: @project.sig_id }
    assert_response :ok
    json = JSON.parse(response.body)
    assert(json.all? { |p| p["sig_id"] == @project.sig_id })
  end

  test "should show project by id" do
    get project_url(@project)
    assert_response :ok
    json = JSON.parse(response.body)
    assert_equal @project.id, json["id"]
  end

  test "should return 404 for non-existent project" do
    get project_url(id: 999999)
    assert_response :not_found
  end
end
