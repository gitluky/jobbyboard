class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :description
      t.datetime :start_datetime
      t.datetime :end_datetime
      t.datetime :expiration_datetime
      t.string :location
      t.belongs_to :user
      t.has_many :assignments
      t.boolean :active, default: true
      t.decimal :allowance, precision: 16, scale: 2

      t.timestamps
    end
  end
end
