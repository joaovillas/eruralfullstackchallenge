class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.string :uri
      t.string :video_url
      t.string :room_title
      t.boolean :is_active, default: true
      t.timestamps
    end
    add_index :rooms, :uri, unique: true
  end
end
