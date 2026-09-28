class EventRegistration < ApplicationRecord
  belongs_to :event
  belongs_to :user

  validates :user_id, uniqueness: {scope: :event_id, message: "Already registered for event"}
end
