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

    def create
        dog = Dog.create(dog_params)
        if dog.valid?
            render json: {dog: dog}, status: :ok
        else
            render json: {errors: dog.errors.full_messages}, status: :not_acceptable
        end
    end

    private

    def dog_params
        params.permit(:name, :breed, :age, :weight, :temperment, :likes, :dislikes,:imageUrl, :user_id)
    end

end
