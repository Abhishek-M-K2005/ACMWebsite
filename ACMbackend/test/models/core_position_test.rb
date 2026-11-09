require "test_helper"

class CorePositionTest < ActiveSupport::TestCase
  setup do
    @position = CorePosition.new(name: "Webmaster", description: nil)
  end

  test "valid core position" do
    assert @position.valid?
  end

  test "has many members" do
    cp = core_positions(:one)
    assert_respond_to cp, :members
  end

  test "has many users" do
    cp = core_positions(:one)
    assert_respond_to cp, :users
  end
end
