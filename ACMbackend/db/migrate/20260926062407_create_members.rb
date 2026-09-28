class CreateMembers < ActiveRecord::Migration[8.1]
  def change
    create_table :members do |t|
      t.string :name
      t.string :email
      t.string :phone_no
      t.string :linkedin
      t.text :avatar_url
      t.references :core_positions, null: false, foreign_key: true
      t.references :sig, null: false, foreign_key: true

      t.timestamps
    end
  end
end
