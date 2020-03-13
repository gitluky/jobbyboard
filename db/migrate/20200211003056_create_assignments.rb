class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.belongs_to :user
      t.belongs_to :post

      t.boolean :completed, default: false
      t.datetime :completion_date

      t.boolean :cancelled, default: false
      t.datetime :cancel_datetime
      t.string :cancel_reason

      t.timestamps
    end
  end
end
