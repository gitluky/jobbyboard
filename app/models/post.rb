class Post < ApplicationRecord
  extend Geocoder::Model::ActiveRecord
  belongs_to :user
  has_many :post_applications
  has_many :applicants, through: :post_applications, source: :user
  has_many :assignments

  scope :created_by_user_with_status, -> (user, status) { joins(:assignments).where(assignments: {status: status}).find_by(user_id: user.id)}

  geocoded_by :location
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode

  def location
    [city, state].join(', ')
  end

  def formatted_created_at
    created_at.strftime('%B, %d, %Y')
  end

  def self.active_posts
    self.where(active: true)
  end

  def self.find_by_query_params(q, location, distance)
    posts_by_location = self.near(location, distance)
    q != '' ? posts_by_location.where("LOWER(posts.title) like LOWER(?) OR LOWER(posts.description) like LOWER(?)", "%#{q}%", "%#{q}%") : posts_by_location
  end

  def toggle_status(flag)
    if (flag == 'cancelled' || flag == 'completed') && self.active?
      self.update("#{flag}": !self[flag], active: false)
    else
      self.update("#{flag}": !self[flag])
    end
  end

end