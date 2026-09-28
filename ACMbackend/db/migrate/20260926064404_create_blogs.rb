class CreateBlogs < ActiveRecord::Migration[8.1]
  def change
    create_table :blogs do |t|
      t.string :title
      t.string :subtitle
      t.text :content
      t.integer :clap
      t.string :writer_name
      t.string :writer_email
      t.references :author, null: true, foreign_key: { to_table: :users }
      t.text :cover_image_url
      t.datetime :published_at

      t.timestamps
    end
  end
end
