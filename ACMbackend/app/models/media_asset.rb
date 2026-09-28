class MediaAsset < ApplicationRecord
  belongs_to :entity, polymorphic: true

  validates :file_name, :file_url, presence: true
end
