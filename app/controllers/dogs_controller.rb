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

    def destroy
        puts params
        dog = Dog.find(params[:id])
        if dog.destroy
            render json: {message: 'deleted'}, status: :ok
        else
            render json: {errors: dog.errors.full_messages}, status: :not_acceptable
        end
    end

    def update
        dog = Dog.find(params[:id])
        if dog.valid?
            dog.update(name: params[:name], breed: params[:breed], age: params[:age], weight: params[:weight], temperment: params[:temperment], likes: params[:likes], dislikes: params[:dislikes], imageUrl: params[:imageUrl])
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
