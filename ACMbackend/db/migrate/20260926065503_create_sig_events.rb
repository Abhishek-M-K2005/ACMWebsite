class CreateSigEvents < ActiveRecord::Migration[8.1]
  def change
    create_table :sig_events do |t|
      t.references :sig, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.datetime :event_date

      t.timestamps
    end
  end
end
