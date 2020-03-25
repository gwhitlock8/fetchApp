# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'bundler'
Bundler.require

session = GoogleDrive::Session.from_service_account_key('./client_secret.json')

spreadsheet = session.spreadsheet_by_title('fetchAPI')

dog_park = spreadsheet.worksheet_by_title('DogParks')

dog_park.rows.drop(1).each do |row|
    DogPark.create(name: row[0], location: row[1], imageUrl: row[2], description: row[3], overall_rating: row[4], fenced: row[5], off_leash: row[6])
end