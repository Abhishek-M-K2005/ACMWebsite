class Sig < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :members, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
