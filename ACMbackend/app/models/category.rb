class Category < ApplicationRecord
  has_and_belongs_to_many :blogs, join_table: "blog_categories"
  has_many :subscriptions, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end