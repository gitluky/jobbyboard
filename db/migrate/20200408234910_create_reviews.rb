class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.references :reviewer
      t.references :reviewee
      t.integer :rating
      t.string :title
      t.text :content
      t.timestamps
    end
  end
end
