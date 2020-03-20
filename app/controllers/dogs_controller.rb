class DogsController < ApplicationController

    def index
        dogs = Dog.all

        render json: {
            status: :completed,
            dogs: dogs
        }
    end

    def show
        dog = Dog.find(params[:id])
        render json: {
            status: :completed,
            dog: dog
        }
    end

end
