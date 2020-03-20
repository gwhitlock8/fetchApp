class DogPark < ApplicationRecord
    has_many :reviews
    has_many :check_ins
end
