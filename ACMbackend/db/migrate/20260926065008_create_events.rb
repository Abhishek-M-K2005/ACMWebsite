class CreateEvents < ActiveRecord::Migration[8.1]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.string :location
      t.string :link
      t.text :cover_image_url
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :is_sub_event

      t.timestamps
    end
  end
end
