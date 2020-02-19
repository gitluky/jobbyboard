class PostSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :description, :formatted_created_at, :location

end
