class CreateProjects < ActiveRecord::Migration[8.1]
  def change
    create_table :projects do |t|
      t.references :year, null: false, foreign_key: true
      t.references :sig, null: false, foreign_key: true
      t.string :title
      t.string :duration
      t.string :meet_link
      t.text :description
      t.text :method
      t.text :results
      t.text :obstacles
      t.text :conclusion
      t.text :references
      t.text :mentors
      t.text :members
      t.text :cover_image_url

      t.timestamps
    end
  end
end
