class MakeUserCorePositionAndSigOptional < ActiveRecord::Migration[8.1]
  def change
    change_column_null :users, :core_position_id, true
    change_column_null :users, :sig_id, true
  end
end
