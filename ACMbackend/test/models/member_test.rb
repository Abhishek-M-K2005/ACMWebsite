require "test_helper"

class MemberTest < ActiveSupport::TestCase
  setup do
    @sig = sigs(:one)
    @core_position = core_positions(:one)
    @member = Member.new(
      name: "Abhishek Maruti Karennavar",
      email: "abhimk.241it002@nitk.edu.in",
      phone_no: "7975643305",
      linkedin: "https://www.linkedin.com/in/abhishekmarutikarennavar",
      avatar_url: "/dpimg/abhishek_maruti_karennavar.jpg",
      sub_sig: "Systems & Dev",
      sig: @sig,
      core_position: @core_position
    )
  end

  test "valid member with all attributes" do
    assert @member.valid?
  end

  test "invalid without name" do
    @member.name = nil
    assert_not @member.valid?
    assert_includes @member.errors[:name], "can't be blank"
  end

  test "belongs to sig" do
    assert_equal @sig, @member.sig
  end

  test "belongs to optional core_position" do
    assert_equal @core_position, @member.core_position
    @member.core_position = nil
    assert @member.valid?
  end

  test "supports sub_sig attribute" do
    assert_equal "Systems & Dev", @member.sub_sig
    @member.sub_sig = "ML"
    assert_equal "ML", @member.sub_sig
  end
end
