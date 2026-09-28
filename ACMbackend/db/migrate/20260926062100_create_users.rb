class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :phone_no
      t.string :linkedin
      t.text :avatar_url
      t.references :core_position, null: false, foreign_key: true
      t.references :sig, null: false, foreign_key: true
      t.string :reset_password_token

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
  end
end
