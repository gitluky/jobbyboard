class PostSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :description, :formatted_created_at, :location

  attribute :search_location do |posts, params|
    params[:search_location]
  end

  attribute :distance do |posts, params|
    params[:distance]
  end

end
