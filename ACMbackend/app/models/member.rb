class Member < ApplicationRecord
  belongs_to :core_position, optional: true
  belongs_to :sig

  validates :name, presence: true
end
