class CreateSigs < ActiveRecord::Migration[8.1]
  def change
    create_table :sigs do |t|
      t.string :name
      t.text :title
      t.text :description
      t.text :vision
      t.text :mission
      t.text :motto

      t.timestamps
    end
    add_index :sigs, :name, unique: true
  end
end
