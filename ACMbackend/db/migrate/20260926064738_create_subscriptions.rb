class CreateSubscriptions < ActiveRecord::Migration[8.1]
  def change
    create_table :subscriptions do |t|
      t.string :name
      t.string :email
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
