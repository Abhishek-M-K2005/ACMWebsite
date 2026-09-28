class CreateSubEvents < ActiveRecord::Migration[8.1]
  def change
    create_table :sub_events do |t|
      t.references :event, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.string :location
      t.string :link
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
