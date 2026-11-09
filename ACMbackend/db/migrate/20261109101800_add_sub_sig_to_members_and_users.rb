class AddSubSigToMembersAndUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :members, :sub_sig, :string
    add_column :users, :sub_sig, :string
  end
end
