class User < ApplicationRecord
  extend Geocoder::Model::ActiveRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable, :recoverable, :rememberable, :validatable, :database_authenticatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :posts
  has_many :assignments
  has_many :post_applications

  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true

  geocoded_by :location
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode

  def location
    [city, state].join(', ')
  end

  def active_posts
    self.posts.where(active: true)
  end

  def currently_assigned_posts
    Post.created_by_user_with_status(self, "Assigned")
  end

  def created_posts_completed
    Post.created_by_user_with_status(self, "Completed")
  end

  def current_assignments
    self.assignments.where(status: 'Assigned')
  end

  def current_assigned_posts
    self.current_assignments.map(&:post)
  end

  def completed_assignments
    self.assignments.where(status: 'Completed')
  end

  def completed_assigned_posts
    self.completed_assignments.map(&:post)
  end

  def applied_to_posts
    self.post_applications.map {|application| application.post}
  end

  def offers
    self.post_applications.where(accepted: true)
  end

  def unconfirmed_offers
    self.offers.where(confirmed: false)
  end

  def confirmed_offers
    self.offers.where(confirmed: true)
  end

end
