class Blog < ApplicationRecord
  belongs_to :author, class_name: 'User', optional: true

  # Replace the has_many :through lines with these:
  has_and_belongs_to_many :categories, join_table: "blog_categories"
  has_and_belongs_to_many :tags, join_table: "blog_tags"

  has_many :media_assets, as: :entity, dependent: :destroy
  validates :title, :content, presence: true
end