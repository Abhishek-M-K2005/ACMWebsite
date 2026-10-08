class AddIsIntraClubToEvents < ActiveRecord::Migration[8.1]
  def change
    add_column :events, :is_intra_club, :boolean, default: false, null: false
    add_index :events, :is_intra_club
  end
end
