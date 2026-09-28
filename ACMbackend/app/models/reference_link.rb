class ReferenceLink < ApplicationRecord
  belongs_to :project_proposal
  
  validates :url, presence: true
end
