class CreateProjectProposalUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :project_proposal_users do |t|
      t.references :project_proposal, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
