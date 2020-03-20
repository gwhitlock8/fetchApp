# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_13_204643) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "check_ins", force: :cascade do |t|
    t.bigint "dog_id", null: false
    t.bigint "dog_park_id", null: false
    t.datetime "checkout_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dog_id"], name: "index_check_ins_on_dog_id"
    t.index ["dog_park_id"], name: "index_check_ins_on_dog_park_id"
  end

  create_table "dog_parks", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "description"
    t.string "overall_rating"
    t.string "imageUrl"
    t.boolean "fenced?"
    t.boolean "off_leash?"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "dogs", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.string "breed"
    t.string "age"
    t.string "weight"
    t.string "temperment"
    t.string "likes"
    t.string "dislikes"
    t.string "imageUrl"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_dogs_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "dog_park_id", null: false
    t.string "overall_rating"
    t.integer "cleanliness"
    t.integer "amenenties"
    t.integer "parking"
    t.string "title"
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dog_park_id"], name: "index_reviews_on_dog_park_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "password_digest"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "check_ins", "dog_parks"
  add_foreign_key "check_ins", "dogs"
  add_foreign_key "dogs", "users"
  add_foreign_key "reviews", "dog_parks"
  add_foreign_key "reviews", "users"
end
