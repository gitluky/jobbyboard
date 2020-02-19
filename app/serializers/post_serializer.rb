class PostSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :description, :start_datetime, :end_datetime, :expiration_datetime, :location
  
end
