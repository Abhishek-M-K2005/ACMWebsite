class CreateProjectProposals < ActiveRecord::Migration[8.1]
  def change
    create_table :project_proposals do |t|
      t.references :sig, null: false, foreign_key: true
      t.string :title
      t.integer :year
      t.string :duration
      t.boolean :is_hosted
      t.text :hosted_link
      t.text :thumbnail_url
      t.text :introduction
      t.text :learning_outcomes
      t.text :method_description
      t.string :results
      t.text :application
      t.text :obstacles
      t.text :conclusion
      t.text :future_work
      t.text :references
      t.string :mentors
      t.text :members
      t.text :readme_md

      t.timestamps
    end
  end
end
