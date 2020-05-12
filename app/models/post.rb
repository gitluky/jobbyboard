class Post < ApplicationRecord
  extend Geocoder::Model::ActiveRecord
  include ActionView::Helpers::NumberHelper

  belongs_to :user
  has_many :likes
  has_many :likers, through: :likes, source: :user
  has_many_attached :photos

  validates :title, :description, :city, :state, :start_datetime, :payment, presence: true
  validates :expiration_datetime, presence: { message: "/Duration can't be blank."}

  geocoded_by :location
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode

  def active?
    !future? && started? && !expired?
  end

  def inactive?
    future? || expired?
  end

  def started?
    start_datetime < DateTime.now
  end

  def expired?
    expiration_datetime < DateTime.now
  end

  def future?
    start_datetime > DateTime.now
  end

  def location
    [city, state].join(', ')
  end

  def formatted_ts(datetime)
    datetime.strftime('%B, %d, %Y %H:%M')
  end

  def formatted_start_date
    formatted_ts(start_datetime)
  end

  def formatted_exp_date
    formatted_ts(expiration_datetime)
  end

  def payment_in_dollars
    number_with_precision(self.payment, precision: 2)
  end

  def self.find_by_query_params(q, location, distance)
    posts_by_location = self.near(location, distance)
    posts = q != '' ? posts_by_location.where("LOWER(posts.title) like LOWER(?) OR LOWER(posts.description) like LOWER(?)", "%#{q}%", "%#{q}%") : posts_by_location
    posts.select {|post| post.active?}
  end

  def toggle_deactivated_status(flag)
    self.update(deactivated: !self.deactivated)
  end

end
