class CreateCheckIns < ActiveRecord::Migration[6.0]
  def change
    create_table :check_ins do |t|
      t.references :dog, null: false, foreign_key: true
      t.references :dog_park, null: false, foreign_key: true
      t.datetime :checkout_time

      t.timestamps
    end
  end
end
