class User < ApplicationRecord
  has_secure_password
  belongs_to :core_position, optional: true
  belongs_to :sig, optional: true
  
  # Add this line
  has_and_belongs_to_many :project_proposals, join_table: :project_proposal_users
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end