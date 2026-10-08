class User < ApplicationRecord
  has_secure_password
  belongs_to :core_position, optional: true
  belongs_to :sig, optional: true
  
  # Add this line
  has_and_belongs_to_many :project_proposals, join_table: :project_proposal_users
  
  has_many :blogs, foreign_key: :author_id, dependent: :nullify
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: {
    with: /\A[a-zA-Z0-9._%+-]+@nitk\.edu\.in\z/i,
    message: "must be an official NITK email (@nitk.edu.in)"
  }

  def core_member?
    core_position.present?
  end

  def webmaster?
    core_position&.name&.downcase == 'webmaster'
  end

  def can_write_blog?
    # Webmaster, Convenor, Chairperson, President, or any core member
    core_member?
  end
end