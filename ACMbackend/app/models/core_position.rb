class CorePosition < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :members, dependent: :nullify

  validates :name, uniqueness: true
end
