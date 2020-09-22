class Room < ApplicationRecord
  validates :video_url, presence: true
  validates :room_title, presence: true
  validates :uri, presence: true
end
