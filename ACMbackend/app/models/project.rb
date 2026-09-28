class Project < ApplicationRecord
  belongs_to :year
  belongs_to :sig

  has_many :media_assets, as: :entity, dependent: :destroy

  validates :year_id, :sig_id, :title, presence: true
end

