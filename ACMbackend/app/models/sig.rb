class Sig < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :members, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :project_proposals, dependent: :destroy
  has_many :media_assets, as: :entity, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
