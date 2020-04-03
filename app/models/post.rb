class Post < ApplicationRecord
  extend Geocoder::Model::ActiveRecord
  belongs_to :user
  has_many :likes
  has_many :likers, through: :likes, source: :user
  has_many_attached :photos

  geocoded_by :location
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode

  def current_assignment
    self.assigned ? self.assignments.order(created_at: desc).first : nil
  end

  def active?
    !deactivated && started? && !expired?
  end

  def inactive?
    deactivated? || expired?
  end

  def started?
    start_datetime < DateTime.now
  end

  def expired?
    expiration_datetime < DateTime.now
  end

  def location
    [city, state].join(', ')
  end

  def formatted_ts(datetime)
    datetime.strftime('%B, %d, %Y')
  end

  def formatted_created_at
    formatted_ts(created_at)
  end

  def formatted_exp_date
    formatted_ts(expiration_datetime)
  end

  def self.find_by_query_params(q, location, distance)
    posts_by_location = self.near(location, distance)
    q != '' ? posts_by_location.where("LOWER(posts.title) like LOWER(?) OR LOWER(posts.description) like LOWER(?)", "%#{q}%", "%#{q}%") : posts_by_location
  end

  def toggle_deactivated_status(flag)
    self.update(deactivated: !self.deactivated)
  end

end
