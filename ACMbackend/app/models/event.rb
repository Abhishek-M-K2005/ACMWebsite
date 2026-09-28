class Event < ApplicationRecord
  has_many :sub_events, dependent: :destroy
  has_many :event_registrations, dependent: :destroy
  has_many :users, through: :event_registrations
  has_many :media_assets, as: :entity, dependent: :destroy

  validates :title, presence: true
end
