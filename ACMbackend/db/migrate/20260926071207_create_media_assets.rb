class CreateMediaAssets < ActiveRecord::Migration[8.1]
  def change
    create_table :media_assets do |t|
      t.references :entity, polymorphic: true, null: false
      t.string :file_name
      t.text :file_url
      t.string :content_type
      t.bigint :byte_size
      t.datetime :uploaded_at

      t.timestamps
    end
  end
end
