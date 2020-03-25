class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: {case_sensitive: false}


  has_many :dogs
  has_many :reviews
end
