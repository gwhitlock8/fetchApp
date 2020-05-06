class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: {case_sensitive: false}
  validates_confirmation_of :password


  has_many :dogs
  has_many :reviews
end
