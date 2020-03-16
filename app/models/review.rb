class Review < ApplicationRecord
  belongs_to :user
  belongs_to :dog_park
end
