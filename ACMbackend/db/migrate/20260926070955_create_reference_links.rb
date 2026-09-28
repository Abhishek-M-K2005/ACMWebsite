class CreateReferenceLinks < ActiveRecord::Migration[8.1]
  def change
    create_table :reference_links do |t|
      t.references :project_proposal, null: false, foreign_key: true
      t.text :url

      t.timestamps
    end
  end
end
