class CreateDogs < ActiveRecord::Migration[6.0]
  def change
    create_table :dogs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :breed
      t.string :age
      t.string :weight
      t.string :temperment
      t.string :likes
      t.string :dislikes

      t.timestamps
    end
  end
end
