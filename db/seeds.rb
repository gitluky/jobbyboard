require 'csv'

csv_text = File.read('public/NY_municipalities.csv')
csv = CSV.parse(csv_text)
ny_municipalities = csv[1..csv.length].flatten

10.times do
  user = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: "password", city: ny_municipalities.sample, state: "NY", jti: SecureRandom.uuid, rti: SecureRandom.uuid)
  user.avatar.attach(io: File.open('./public/default_avatar.png'), filename: 'default_avatar.png', content_type: 'application/png')
  10.times do
    start_datetime = Time.now + rand(2628000)
    expiration_datetime = start_datetime + rand(86400)
    user.posts.create(title: Faker::Lorem.sentences(number: 1)[0], description: Faker::Lorem.paragraph_by_chars(number: rand(100..300)), start_datetime: start_datetime, expiration_datetime: expiration_datetime, city: ny_municipalities.sample, state: "NY", payment: Faker::Number.decimal(l_digits: 2))
  end
  5.times do
    start_datetime = Time.now - rand(2628000)
    expiration_datetime = start_datetime + [86400, 259200, 432000, 604800,1,210,000].sample
    user.posts.create(title: Faker::Lorem.sentences(number: 1)[0], description: Faker::Lorem.paragraph_by_chars(number: rand(100..300)), start_datetime: start_datetime, expiration_datetime: expiration_datetime, city: ny_municipalities.sample, state: "NY", payment: Faker::Number.decimal(l_digits: 2))
  end
end
