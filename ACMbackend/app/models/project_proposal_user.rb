class ProjectProposalUser < ApplicationRecord
  belongs_to :project_proposal
  belongs_to :user
end
