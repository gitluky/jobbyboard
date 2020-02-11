10.times do
  user = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: "password")
  10.times do
    start_datetime = Time.now + rand(2628000)
    end_datetime = start_datetime + rand(86400)
    user.posts.create(title: Faker::Lorem.sentences(number: 1)[0], description: Faker::Lorem.paragraph_by_chars(number: rand(100..300)), start_datetime: start_datetime, end_datetime: end_datetime, location: "#{Faker::Address.city}, #{Faker::Address.state_abbr}", allowance: Faker::Number.decimal(l_digits: 2))
  end
end
