class PostSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :user, :description, :formatted_start_date, :formatted_exp_date, :location, :likers

  attribute :search_location do |posts, params|
    params[:search_location]
  end

  attribute :distance do |posts, params|
    params[:distance]
  end

  attribute :active do |post|
    post.active?
  end

end
