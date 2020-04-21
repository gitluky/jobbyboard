class User < ApplicationRecord
  extend Geocoder::Model::ActiveRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  include Rails.application.routes.url_helpers
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable, :recoverable, :rememberable, :validatable, :database_authenticatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_one_attached :avatar

  has_many :posts
  has_many :likes
  has_many :written_reviews, class_name: 'Review', foreign_key: :reviewer_id
  has_many :received_reviews, class_name: 'Review', foreign_key: :reviewee_id

  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true

  geocoded_by :location
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode

  def location
    [city, state].join(', ')
  end

  def avatar_url
    self.avatar.attached? ? rails_blob_path(self.avatar) : ''
  end

  def active_posts
    self.posts.select {|post| post.active?}
  end

  def inactive_posts
    self.posts.select {|post| post.inactive?}
  end

  def rating
    if !self.received_reviews.empty?
      average = self.received_reviews.map {|review| review.rating }.inject{|sum, el| sum + el } / self.received_reviews.size
      average.round(1)
    else
      'No rating yet.'
    end
  end

end
