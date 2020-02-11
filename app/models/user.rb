class User < ApplicationRecord
  # include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable, :recoverable, :rememberable, :validatable, :database_authenticatable

  has_many :posts
  has_many :assignments
  has_many :post_applications



end
