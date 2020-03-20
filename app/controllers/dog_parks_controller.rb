class DogParksController < ApplicationController

    def index
        parks = DogPark.all
        render json: {
            status: :completed,
            parks: parks
        }
    end

    def show
        park = DogPark.find(params[:id])
        render json: {
            status: :completed,
            park: park
        }
    end

    def check_ins
        park = DogPark.find(params[:id])

        check_ins = park.check_ins.map{|check_in| check_in.checkout_time ? '' : check_in }
        dogs = check_ins.map{|check_in| Dog.find(check_in.dog_id)}

        render json: {
            status: :completed,
            check_ins: check_ins,
            dogs: dogs
        }
    end

    def reviews
        park = DogPark.find(params[:id])
        reviews = park.reviews

        render json: {
            status: :completed,
            reviews: reviews
        }
    end
end
