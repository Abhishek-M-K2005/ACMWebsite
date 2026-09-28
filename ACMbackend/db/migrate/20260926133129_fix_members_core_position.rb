class FixMembersCorePosition < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :members, :core_positions, column: :core_positions_id
    rename_column :members, :core_positions_id, :core_position_id
    change_column_null :members, :core_position_id, true
    add_foreign_key :members, :core_positions, column: :core_position_id
  end
end
