class ProjectProposal < ApplicationRecord
  belongs_to :sig
  
  # Replace has_many :through with this:
  has_and_belongs_to_many :users, join_table: :project_proposal_users
  
  has_many :reference_links, dependent: :destroy
  has_many :media_assets, as: :entity, dependent: :destroy

  validates :title, presence: true
end